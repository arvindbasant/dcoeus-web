import React, { FC } from 'react';
import { ShelfFieldDef, ShelfChannel, ShelfUnitSpec } from 'models/shelf/spec';
import { FieldRangePredicate, FieldOneOfPredicate } from 'vega-lite/build/src/predicate';
import EncodingShelf from '../EncodingShelf';
import { Icon } from 'antd';
import './EncodingPane.scss';

export interface EncodingPaneProps {
  spec: ShelfUnitSpec;
  filters?: Array<FieldRangePredicate | FieldOneOfPredicate>;
  // schema: Schema;
  fieldDefs?: ShelfFieldDef[];
  isNonPosinalEncoding: boolean;
}

const renderNonPositionalEncodingShelf = (spec: ShelfUnitSpec) => {
  const { encoding } = spec;
  return (
    (['size', 'color', 'shape', 'detail', 'text'] as ShelfChannel[]).map(channel => (
      <div className="encoding-pane__shelf-wrapper" key={channel}>
        <div className="encoding-pane__shelf-wrapper__label">
          <div>{channel}</div>
        </div>
        <EncodingShelf
          id={{ channel }}
          fieldDef={encoding[channel]}
        // valueDef={{ value: encoding[channel] }}
        />
      </div>
    ))
  );
};

const renderPosinalAndFacelEncodingShelf = (spec: ShelfUnitSpec) => {
  const { encoding } = spec;
  return (
    (['x', 'y'] as ShelfChannel[]).map(channel => {
      const facetChannel: ShelfChannel = channel === 'x' ? 'column' : 'row';
      const icon = channel === 'x' ? { name: 'menu', style: { transform: 'rotate(90deg)' } } : { name: 'menu' };
      return (
        <div className="encoding-pane__shelf-wrapper" key={channel}>
          <div className="encoding-pane__shelf-wrapper__label">
            {icon && <Icon type={icon.name} style={icon.style} />}
            <div>{channel}</div>
          </div>
          <div style={{ display: 'flex', flex: 1 }}>
            <EncodingShelf
              id={{ channel }}
              fieldDef={encoding[channel]}
            // valueDef={encoding[channel]}
            />
            <EncodingShelf
              id={{ channel: facetChannel }}
              fieldDef={encoding[facetChannel]}
            // valueDef={{ value: encoding[channel] }}
            />
          </div>
        </div>
      );
    })
  );
};

const EncodingPane: FC<EncodingPaneProps> = ({ isNonPosinalEncoding, spec, filters, fieldDefs }: EncodingPaneProps) => {
  const shelves = isNonPosinalEncoding ? renderNonPositionalEncodingShelf(spec) : renderPosinalAndFacelEncodingShelf(spec);
  return (<div className="encoding-pane">
    {shelves}
  </div>);
};

export default EncodingPane;
