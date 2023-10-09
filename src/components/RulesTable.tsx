import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { Cell } from "./Cell";

type Rule = {
  GroupAndLogins: String;
  Schedule: String;
  Symbols: String;
  Securities: String;
  LeverageMode: String;
  MultiplierMode: String;
  Level1: String;
  Level2: String;
  Level3: String;
  Level4: String;
  Level5: String;
  Level6: String;
  Level7: String;
  Level8: String;
  Level9: String;
};

const keys = [
  "GroupAndLogins",
  "Schedule",
  "Symbols",
  "Securities",
  "LeverageMode",
  "MultiplierMode",
  "Level1",
  "Level2",
  "Level3",
  "Level4",
  "Level5",
  "Level6",
  "Level7",
  "Level8",
  "Level9",
];

const columnHelper = createColumnHelper<Rule>();

const columns = [
  columnHelper.accessor("GroupAndLogins", {
    header: "GroupAndLogins",
    cell: Cell,
  }),
  columnHelper.accessor("Schedule", {
    header: "Schedule",
    cell: Cell,
  }),
  columnHelper.accessor("Symbols", {
    header: "Symbols",
    cell: Cell,
  }),
  columnHelper.accessor("Securities", {
    header: "Securities",
    cell: Cell,
  }),
  columnHelper.accessor("LeverageMode", {
    header: "LeverageMode",
    cell: Cell,
  }),
  columnHelper.accessor("MultiplierMode", {
    header: "MultiplierMode",
    cell: Cell,
  }),
  columnHelper.accessor("Level1", {
    header: "Level1",
    cell: Cell,
  }),
  columnHelper.accessor("Level2", {
    header: "Level2",
    cell: Cell,
  }),
  columnHelper.accessor("Level3", {
    header: "Level3",
    cell: Cell,
  }),
  columnHelper.accessor("Level4", {
    header: "Level4",
    cell: Cell,
  }),
  columnHelper.accessor("Level5", {
    header: "Level5",
    cell: Cell,
  }),
  columnHelper.accessor("Level6", {
    header: "Level6",
    cell: Cell,
  }),
  columnHelper.accessor("Level7", {
    header: "Level7",
    cell: Cell,
  }),
  columnHelper.accessor("Level8", {
    header: "Level8",
    cell: Cell,
  }),
  columnHelper.accessor("Level9", {
    header: "Level9",
    cell: Cell,
  }),
];

export const RulesTable = () => {
  const [rules, setRules] = useState([]);
  const [address, setAddress] = useState("");

  const onLoadHandler = (event: any) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        command: "get_rules",
      }),
    };
    fetch(`http://${address}`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        const rawRules = result.File.split(/\r?\n/);
        const splittedRules = rawRules.splice(1);
        const rules: any = [];
        for (const rule of splittedRules) {
          const parsedRule = rule.split(";");
          const obj: any = {};
          for (const key of keys) {
            obj[key] = parsedRule[keys.indexOf(key)];
          }
          rules.push(obj);
        }
        setRules(rules);
      })
      .catch(() => {
        console.log(`Cannot connect to "${address}"`);
      });
  };

  const onSaveHandler = (event: any) => {
    event.preventDefault();
    let stringRules =
      "GroupAndLogins;Schedule;Symbols;Securities;LeverageMode;MultiplierMode;Level1;Level2;Level3;Level4;Level5;Level6;Level7;Level8;Level9\n";
    for (let i = 0; i < rules.length; i++) {
      const values = Object.values(rules[i]);
      for (let i = 0; i < values.length; i++) {
        values[i] += ";";
      }
      let str: any = values.toString().replaceAll(";,", ";");
      console.log(str);
      stringRules = stringRules + str + "\n";
    }

    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        command: "set_rules",
        File: stringRules.slice(0, -2),
      }),
    };

    fetch(`http://${address}`, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      })
      .catch(() => {
        console.log(`Cannot connect to "${address}"`);
      });
  };

  const table = useReactTable({
    data: rules,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData(rowIndex: number, columnId: string, value: string) {
        setRules((old: any) =>
          old.map((row: any, index: any) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
  });

  return (
    <>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="host:port"
          aria-label="host:port"
          aria-describedby="basic-addon1"
          onChange={(e) => setAddress(e.target.value)}
        />
      </InputGroup>
      <Button variant="warning" onClick={onLoadHandler}>
        Load
      </Button>

      <Table bordered hover>
        <thead>
          {table.getHeaderGroups().map((headerGroup, index) => (
            <tr key={index}>
              {headerGroup.headers.map((header, index) => (
                <th key={index}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr key={index}>
              {row.getVisibleCells().map((cell, index) => (
                <td key={index}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="success" onClick={onSaveHandler}>
        Save
      </Button>
      <p>23.105.231.108:9567</p>
    </>
  );
};
