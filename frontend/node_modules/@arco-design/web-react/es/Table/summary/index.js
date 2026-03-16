import Row from './row';
import Cell from './cell';
function Summary(props) {
    return props.children;
}
Summary.Row = Row;
Summary.Cell = Cell;
export default Summary;
