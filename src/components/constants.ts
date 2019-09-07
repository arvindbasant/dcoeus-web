export const TOOLBAR_ITMES = [
  { label: 'undo', icon: 'arrow-left' },
  { label: 'redo', icon: 'arrow-right' },
  { label: 'save', icon: 'save' },
  { label: 'datasource', icon: 'database' },
  { label: 'chart', icon: 'project' },
  { label: 'share', icon: 'share-alt' },
  { label: 'mail', icon: 'mail' },
  { label: 'align-left', icon: 'align-left' },
  { label: 'align-center', icon: 'align-center' },
  { label: 'align-right', icon: 'align-right' },
  { label: 'font size', icon: 'font-size' },
  { label: 'bold', icon: 'bold' },
  { label: 'italic', icon: 'italic' },
  { label: 'text color', icon: 'font-colors' },
  { label: 'zoom in', icon: 'zoom-in' },
  { label: 'zoom out', icon: 'zoom-out' },
  { label: 'bookmark', icon: 'pushpin' },
];

export const CHART_TYPES = [
  { label: 'bar', icon: 'bar-chart' },
  { label: 'area', icon: 'area-chart' },
  { label: 'line', icon: 'line-chart' },
  { label: 'dot', icon: 'dot-chart' },
  { label: 'pie', icon: 'pie-chart' },
  { label: 'stock', icon: 'stock' },
  { label: 'box plot', icon: 'box-plot' },
  { label: 'fund', icon: 'fund' },
  { label: 'sliders', icon: 'sliders' },
];

export const DATA_COLUMNS: Array<{name: string, type: 'ordinal' | 'temporal' | 'quantitative' | 'nominal'}> = [
  { name: 'cylinders', type: 'nominal' },
  { name: 'Name', type: 'nominal' },
  { name: 'Origin', type: 'nominal' },
  { name: 'Year', type: 'temporal' },
  { name: 'Count', type: 'quantitative' },
  { name: 'Acceleration', type: 'quantitative' },
  { name: 'Displacement', type: 'quantitative' },
  { name: 'Horsepower', type: 'quantitative' },
  { name: 'Miles per gallon', type: 'quantitative' },
  { name: 'Weight in lbs', type: 'quantitative' },
  { name: 'Pollution rating', type: 'ordinal' },

];