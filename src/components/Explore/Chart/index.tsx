import React, { PureComponent } from 'react';
import { View as VegaView, parse as parseVegaSpec, Warn, changeset } from 'vega';
import { compile as compileVegaToVLSpec } from 'vega-lite';
import { TopLevelSpec } from 'vega-lite';
import { InlineData } from 'vega-lite/build/src/data';
import * as VegaTooltip from 'vega-tooltip';
import './Chart.scss';

interface ChartProps {
  chartSpec: TopLevelSpec;
  renderer?: 'svg' | 'canvas';
  data?: InlineData;
  viewRunAfter?: (view: VegaView) => any;
}

interface ChartState {
  isLoading: boolean;
}

class Chart extends PureComponent<ChartProps, ChartState> {

  private readonly chartRef: React.RefObject<HTMLDivElement>;

  private view!: VegaView;
  private size!: { width: number, height: number };

  private mountTimeout!: number;
  private updateTimeout!: number;

  constructor(props: ChartProps) {
    super(props);
    this.state = {
      isLoading: true
    };
    this.chartRef = React.createRef();

  }

  public render() {
    return (
      <div className={'chart-container'}>
        <div className={'chart'} ref={this.chartRef} />
        <div id="vis-tooltip" className="vg-tooltip" />
      </div>
    );
  }

  public componentDidMount() {
    if (this.mountTimeout) {
      clearTimeout(this.mountTimeout);
    }
    this.setState({
      isLoading: true
    });

    this.mountTimeout = window.setTimeout(() => {
      this.updateSpec();
    });
  }

  public componentWillReceiveProps(nextProps: ChartProps) {
    if (nextProps.chartSpec !== this.props.chartSpec) {
      this.setState({
        isLoading: true
      });
      this.size = this.getChartSize();
    }
  }

  public componentDidUpdate(prevProps: ChartProps, prevState: ChartState) {
    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout);
    }
    this.updateTimeout = window.setTimeout(
      (spec: TopLevelSpec, data: InlineData) => {
        if (prevProps.chartSpec !== spec) {
          const chart = this.chartRef.current as HTMLDivElement;
          chart.style.width = this.size.width + 'px';
          chart.style.height = this.size.height + 'px';
          this.updateSpec();
        } else if (prevProps.data !== data) {
          this.bindData();
        }
        this.runView();
        this.setState({
          isLoading: false
        });
      },
      0, this.props.chartSpec, this.props.data
    );
  }

  public componentWillUnmount() {
    if (this.mountTimeout) {
      clearTimeout(this.mountTimeout);
    }

    if (this.updateTimeout) {
      clearTimeout(this.updateTimeout);
    }

    if (this.view) {
      this.view.finalize();
    }
  }

  protected updateSpec() {
    const vlSpec = this.props.chartSpec;
    try {
      const spec = compileVegaToVLSpec(vlSpec).spec;
      const runtime = parseVegaSpec(spec, vlSpec.config);
      this.view = new VegaView(runtime)
        .logLevel(Warn)
        .initialize(this.chartRef.current as HTMLDivElement)
        .renderer(this.props.renderer || 'canvas')
        .hover();
      VegaTooltip.default(this.view);
      this.bindData();
    } catch (err) {
      // log error
    }
  }

  private bindData() {
    const { data, chartSpec } = this.props;
    console.log(data);
    this.view.change(chartSpec.data!.name!, changeset()
      .remove(() => true)
      .insert(data!.values)
    );

  }

  private runView() {
    try {
      this.view.run();
      if (this.props.viewRunAfter) {
        this.view.runAfter(this.props.viewRunAfter);
      }
    } catch (err) {
      // this.props.logger.error(err);
    }
  }

  private getChartSize(): { width: number, height: number } {
    const chart = this.chartRef.current as HTMLDivElement;
    const chartContainer = chart.querySelector(this.props.renderer || 'canvas')!;
    const width = Number(chartContainer.getAttribute('width'));
    const height = Number(chartContainer.getAttribute('height'));
    return { width, height };
  }

}

export { Chart };
