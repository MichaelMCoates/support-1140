import { ModuleRegistry } from "@ag-grid-community/core";
import { InfiniteRowModelModule } from "@ag-grid-community/infinite-row-model";
import "@ag-grid-community/styles/ag-grid.css";
import { ColDef, GridReadyEvent, IDatasource } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useMemo, useRef, useState } from "react";

ModuleRegistry.registerModules([InfiniteRowModelModule]);

const CellRenderer = (props: any) => {
  if (props.value !== undefined) {
    console.log(`cellRenderer: value exists`);
    return props.value;
  } else {
    console.log(`cellRenderer: showing spinner`);
    return <img src={"https://www.ag-grid.com/example-assets/loading.gif"} />;
  }
};

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    // this row shows the row index, doesn't use any data from the row
    {
      headerName: "ID",
      maxWidth: 100,
      valueGetter: "node.id",
    },
    { field: "athlete", minWidth: 150 },
    { field: "age" },
    { field: "country", minWidth: 150 },
    { field: "year" },
    { field: "date", minWidth: 150 },
    { field: "sport", minWidth: 150 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
      sortable: false,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((response) => response.json())
      .then((data) => {

        const rowsThisPage = data.slice(0, 11);
        params.api.setRowData(rowsThisPage)
        let row = 0;
        setInterval(() => {
            console.log('Updating rows: ', row)
            // console.log('Updating rows: ', Date.now());
            // console.log(rowsThisPage);
            rowsThisPage[row % 11].athlete = `Updated #${row}`
            params.api.setRowData(rowsThisPage)
            row += 1;
        }, 500)


        params.api.setDomLayout("autoHeight");
      });
  }, []);

  return (
    <div className={"flex flex-col"} style={{ width: "100%", height: "100%" }}>
      <AgGridReact
        ref={gridRef}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowBuffer={0}
        cacheBlockSize={100}
        cacheOverflowSize={2}
        maxConcurrentDatasourceRequests={1}
        maxBlocksInCache={10}
        onGridReady={onGridReady}
        frameworkComponents={CellRenderer}
      />
    </div>
  );
};

export default GridExample;
