import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

export const Cell = ({
  getValue,
  row,
  column,
  table,
}: {
  getValue: any;
  row: any;
  column: any;
  table: any;
}) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  return (
    <Form.Control
      aria-describedby="basic-addon1"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
    />
  );
  //return <input value={value} onChange={(e) => setValue(e.target.value)} />;
};
