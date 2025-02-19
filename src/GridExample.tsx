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
  //   const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  // const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const gridRef = useRef<AgGridReact>(null);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    // this row shows the row index, doesn't use any data from the row
    {
      headerName: "ID",
      maxWidth: 100,
      // it is important to have node.id here, so that when the id changes (which happens
      // when the row is loaded) then the cell is refreshed.
      valueGetter: "node.id",
      //   cellRenderer: (props: any) => {
      //     if (props.value !== undefined) {
      //       return props.value;
      //     } else {
      //       return (
      //         <img src={"https://www.ag-grid.com/example-assets/loading.gif"} />
      //       );
      //     }
      //   },
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

  //   const gridReady = () => {
  //     fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  //       .then((response) => response.json())
  //       .then(function (data) {
  //         // const dataSource: IDatasource = {
  //         //   rowCount: undefined, // behave as infinite scroll

  //         //   getRows: (params) => {
  //         //     console.log(
  //         //       "asking for " + params.startRow + " to " + params.endRow
  //         //     );

  //         //     // At this point in your code, you would call the server.
  //         //     // To make the demo look real, wait for 500ms before returning
  //         //     setTimeout(() => {
  //         //       // take a slice of the total rows
  //         //       const rowsThisPage = data.slice(params.startRow, params.endRow);
  //         //       // if on or after the last page, work out the last row.
  //         //       let lastRow = -1;
  //         //       if (data.length <= params.endRow) {
  //         //         lastRow = data.length;
  //         //       }
  //         //       // call the success callback
  //         //       params.successCallback(rowsThisPage, lastRow);
  //         //     }, 500);
  //         //   },
  //         // };
  //         // setRowDataSource(dataSource);
  //         setRowData(data);
  //       });
  //   };

  // const onGridReady = useCallback((params: GridReadyEvent) => {
  //   fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const dataSource: IDatasource = {
  //         rowCount: undefined, // behave as infinite scroll

  //         getRows: (params) => {
  //           console.log(
  //             "asking for " + params.startRow + " to " + params.endRow
  //           );

  //           // At this point in your code, you would call the server.
  //           // To make the demo look real, wait for 500ms before returning
  //           setTimeout(() => {
  //             // take a slice of the total rows
  //             const rowsThisPage = data.slice(0, 100);
  //             // if on or after the last page, work out the last row.
  //             let lastRow = -1;
  //             // if (data.length <= params.endRow) {
  //             //   lastRow = data.length;
  //             // }
  //             // call the success callback
  //             params.successCallback(rowsThisPage, lastRow);
  //           }, 500);
  //         },
  //       };
  //       params.api.setDatasource(dataSource);
  //       params.api.setDomLayout("autoHeight");
  //       // setRowDataSource(dataSource);
  //       // console.log(data);
  //       // setRowData(data);
  //     });
  // }, []);


  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((response) => response.json())
      .then((data) => {
        // const dataSource: IDatasource = {
        //   rowCount: undefined, // behave as infinite scroll

        //   getRows: (params) => {
        //     console.log(
        //       "asking for " + params.startRow + " to " + params.endRow
        //     );

        //     // At this point in your code, you would call the server.
        //     // To make the demo look real, wait for 500ms before returning
        //     setTimeout(() => {
        //       // take a slice of the total rows
        //       const rowsThisPage = data.slice(0, 100);
        //       // if on or after the last page, work out the last row.
        //       let lastRow = -1;
        //       // if (data.length <= params.endRow) {
        //       //   lastRow = data.length;
        //       // }
        //       // call the success callback
        //       params.successCallback(rowsThisPage, lastRow);
        //     }, 500);
        //   },
        // };
        // params.api.setDatasource(dataSource);


        // Adding 100 rows every 5 seconds
        // let newRowData: any[] = []
        // const rowsThisPage = data.slice(0, 100);
        // newRowData = newRowData.concat(rowsThisPage);
        // params.api.setRowData(newRowData)
        // let totalRows = 100;
        // setInterval(() => {
        //     totalRows += 100;
        //     console.log('100 more rows, total rows are ', totalRows);
        //     const rowsThisPage = data.slice(0, 100);
        //     newRowData = newRowData.concat(rowsThisPage);
        //     params.api.setRowData(newRowData)

        // }, 5000)

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
        // params.api.setRowData()
        // setRowDataSource(dataSource);
        // console.log(data);
        // setRowData(data);
      });
  }, []);

  // fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //         const dataSource: IDatasource = {
  //             rowCount: undefined,
  //             getRows: (params) => {
  //                 console.log('asking for ' + params.startRow + ' to ' + params.endRow);
  //                 // At this point in your code, you would call the server.
  //                 // To make the demo look real, wait for 500ms before returning
  //                 setTimeout(function () {
  //                     // take a slice of the total rows
  //                     const rowsThisPage = data.slice(params.startRow, params.endRow);
  //                     // if on or after the last page, work out the last row.
  //                     let lastRow = -1;
  //                     if (data.length <= params.endRow) {
  //                         lastRow = data.length;
  //                     }
  //                     // call the success callback
  //                     params.successCallback(rowsThisPage, lastRow);
  //                 }, 500);
  //             }
  //         };
  //         params.api.setGridOption('datasource', dataSource);
  //     });

  //         });
  // }, []);

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
        suppressAnimationFrame={true}
      />
    </div>
  );
};

export default GridExample;
