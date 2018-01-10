const data = {
  title: 'analytics',
  color: '#12939A',
  children: [
    {
      title: 'cluster',
      children: [
        {
          title: 'AgglomerativeCluster',
          color: '#12939A',
          size: 3938
        },
        {
          title: 'CommunityStructure',
          color: '#12939A',
          size: 3812
        },
        {
          title: 'HierarchicalCluster',
          color: '#12939A',
          size: 6714
        },
        {
          title: 'MergeEdge',
          color: '#12939A',
          size: 743
        }
      ]
    },
    {
      title: 'graph',
      children: [
        {
          title: 'BetweennessCentrality',
          color: '#12939A',
          size: 3534
        },
        {
          title: 'LinkDistance',
          color: '#12939A',
          size: 5731
        },
        {
          title: 'MaxFlowMinCut',
          color: '#12939A',
          size: 7840
        },
        {
          title: 'ShortestPaths',
          color: '#12939A',
          size: 5914
        },
        {
          title: 'SpanningTree',
          color: 'red',
          size: 3416
        }
      ]
    },
    {
      title: 'optimization',
      children: [
        {
          title: 'AspectRatioBanker',
          color: '#12939A',
          size: 7074
        }
      ]
    }
  ]
}

import React from 'react';
import {Sunburst} from 'react-vis'

const LABEL_STYLE = {
  fontSize: '8px',
  textAnchor: 'middle'
};

/**
 * Recursively work backwards from highlighted node to find path of valud nodes
 * @param {Object} node - the current node being considered
 * @returns {Array} an array of strings describing the key route to the current node
 */
function getKeyPath(node) {
  if (!node.parent) {
    return ['root'];
  }

  return [node.data && node.data.name || node.name].concat(getKeyPath(node.parent));
}

/**
 * Recursively modify data depending on whether or not each cell has been selected by the hover/highlight
 * @param {Object} data - the current node being considered
 * @param {Object|Boolean} keyPath - a map of keys that are in the highlight path
 * if this is false then all nodes are marked as selected
 * @returns {Object} Updated tree structure
 */
function updateData(data, keyPath) {
  if (data.children) {
    data.children.map(child => updateData(child, keyPath));
  }
  // add a fill to all the uncolored cells
  if (!data.hex) {
    data.style = {
      fill: 'red'
    };
  }
  data.style = {
    ...data.style,
    fillOpacity: keyPath && !keyPath[data.name] ? 0.2 : 1
  };

  return data;
}

const decoratedData = updateData(data, false);

export default class BasicSunburst extends React.Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  render() {
    const {clicked, data, finalValue, pathValue} = this.state;
    return (
      <div className="basic-sunburst-example-wrapper">
        <div>{clicked ? 'click to unlock selection' : 'click to lock selection'}</div>
        <Sunburst
          animation
          className="basic-sunburst-example"
          hideRootNode
          onValueMouseOver={node => {
            if (clicked) {
              return;
            }
            const path = getKeyPath(node).reverse();
            const pathAsMap = path.reduce((res, row) => {
              res[row] = true;
              return res;
            }, {});
            this.setState({
              finalValue: path[path.length - 1],
              pathValue: path.join(' > '),
              data: updateData(decoratedData, pathAsMap)
            });
          }}
          onValueMouseOut={() => clicked ? () => {} : this.setState({
            pathValue: false,
            finalValue: false,
            data: updateData(decoratedData, false)
          })}
          onValueClick={() => this.setState({clicked: !clicked})}
          style={{
            stroke: '#ddd',
            strokeOpacity: 0.3,
            strokeWidth: '0.5'
          }}
          colorType="literal"
          getSize={d => d.value}
          getColor={d => d.hex}
          data={data}
          height={300}
          width={350}>
          {finalValue && <LabelSeries data={[
            {x: 0, y: 0, label: finalValue, style: LABEL_STYLE}
          ]} />}
        </Sunburst>
        <div className="basic-sunburst-example-path-name">{pathValue}</div>
      </div>
    );
  }

}