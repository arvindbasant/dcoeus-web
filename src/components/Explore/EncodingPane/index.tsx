import React, { Component, FC, CSSProperties, PureComponent } from 'react';
import { ShelfFieldDef, SpecificEncoding, ShelfMark, ShelfChannel, ShelfUnitSpec, ShelfChannelId } from 'models/shelf/spec';
import { FieldRangePredicate, FieldOneOfPredicate } from 'vega-lite/build/src/predicate';
import { Config } from 'vega-lite';
import { Channel } from 'vega-lite/build/src/channel';
import EncodingShelf from '../EncodingShelf';
import { Icon } from 'antd';
import { ValueDef, Value } from 'vega-lite/build/src/channeldef';
import './EncodingPane.scss';

export interface EncodingPaneProps {
  spec: ShelfUnitSpec;
  filters?: Array<FieldRangePredicate | FieldOneOfPredicate>;
  // schema: Schema;
  fieldDefs?: ShelfFieldDef[];
  isNonPosinalEncoding: boolean;
}

class EncodingPane extends PureComponent<EncodingPaneProps> {

  constructor(props: EncodingPaneProps) {
    super(props);
  }

  public render() {
    const { spec, filters, fieldDefs, isNonPosinalEncoding } = this.props;
    const shelves = isNonPosinalEncoding ? this.renderNonPositionalEncodingShelf() : this.renderPosinalAndFacelEncodingShelf();
    return (
      <div className="encoding-pane">
        {shelves}
      </div>
    );
  }

  private renderNonPositionalEncodingShelf() {
    const { spec, filters, fieldDefs } = this.props;
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
  }

  private renderPosinalAndFacelEncodingShelf() {
    const { spec, filters, fieldDefs } = this.props;
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
  }
}

export default EncodingPane;
