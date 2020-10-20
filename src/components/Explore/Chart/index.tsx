import React, { FC, useState, useRef, useEffect } from 'react';
import { View as VegaView, parse as parseVegaSpec, Warn, changeset } from 'vega';
import { compile as compileVegaToVLSpec } from 'vega-lite';
import { TopLevelSpec } from 'vega-lite';
import { InlineData } from 'vega-lite/build/src/data';
import * as VegaTooltip from 'vega-tooltip';
import './Chart.scss';

interface ChartProps {
  spec: TopLevelSpec;
  renderer?: 'svg' | 'canvas';
  data?: InlineData;
  viewRunAfter?: (view: VegaView) => any;
}
type Size = {
  width: number,
  height: number
};
const Chart: FC<ChartProps> = ({ spec, renderer = 'svg', data, viewRunAfter }) => {
  let view: VegaView;
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  const [loading, setLoading] = useState(false);
  let mountTimeout: number;
  let updateTimeout: number;

  const chartRef = useRef<HTMLDivElement>(null);

  const getChartSize = () => {
    const node: HTMLDivElement = chartRef.current!;
    const chartContainer = node.querySelector(renderer);
    if (chartContainer) {
      const width = Number(chartContainer.getAttribute('width'));
      const height = Number(chartContainer.getAttribute('height'));
      return { width, height };
    }
    return { width: 0, height: 0 };
  };

  const bindData = () => {
    view.change(spec.data!.name!, changeset()
      .remove(() => true)
      .insert(data!.values)
    );
  };

  const runView = () => {
    try {
      view.run();
      if (viewRunAfter) {
        view.runAfter(viewRunAfter);
      }
    } catch (err) {
      // logger.error(err);
    }
  };

  const updateSpec = () => {
    console.log('updateSpec');
    try {
      const vlSpec = compileVegaToVLSpec(spec).spec;
      const runtime = parseVegaSpec(vlSpec, spec.config);
      console.log('vlsec', vlSpec, runtime);
      view = new VegaView(runtime)
        .logLevel(Warn)
        .initialize(chartRef.current as HTMLDivElement)
        .renderer(renderer)
        .hover();
      VegaTooltip.default(view);
      bindData();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log('mount');
    if (mountTimeout) {
      clearTimeout(mountTimeout);
    }
    setLoading(true);
    mountTimeout = window.setTimeout(() => {
      updateSpec();
    });
  }, []);

  useEffect(() => {
    return () => {
      console.log('unmount');
      if (mountTimeout) {
        clearTimeout(mountTimeout);
      }
      if (updateTimeout) {
        clearTimeout(updateTimeout);
      }
      if (view) {
        view.finalize();
      }
    };
  }, []);

  useEffect(() => {
    if (updateTimeout) {
      clearTimeout(updateTimeout);
    }
    setLoading(true);
    setSize(getChartSize());
    updateTimeout = window.setTimeout(() => {
      const node = chartRef.current as HTMLDivElement;
      node.style.width = size.width + 'px';
      node.style.height = size.height + 'px';
      updateSpec();
      console.log('view', view);
      // bindData();
      runView();
      setLoading(false);
    }, 0);
  }, [spec])

  // useEffect(() => {
  //   console.log('update');
  //   if (updateTimeout) {
  //     clearTimeout(updateTimeout);
  //   }
  //   updateTimeout = window.setTimeout(() => {
  //     const node = chartRef.current as HTMLDivElement;
  //     node.style.width = size.width + 'px';
  //     node.style.height = size.height + 'px';
  //     updateSpec();
  //     // console.log('view', view);
  //     // bindData();
  //     runView();
  //     setLoading(false);
  //   }, 0);
  // });

  return (
    <div className={'chart-container'}>
      <div className={'chart'} ref={chartRef} />
      <div id="vis-tooltip" className="vg-tooltip" />
    </div>
  );
};

export { Chart };
