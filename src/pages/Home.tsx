import Papa from "papaparse";
import { useEffect, useState } from "react";
import Table from "../components/Table";
import Multiselectcomp from "../components/Multiselectcomp";
const Home = () => {
  const [data, setData] = useState<any>([]);
  const PAGE_SIZE = 100;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedValues, setSelectedValues] = useState<any>([]);
  const [selected350, setSelected350] = useState<any>([]);
  const [selected8000, setSelected8000] = useState<any>([]);
  const [selected20002, setSelected20002] = useState<any>([]);
  const [end, setEnd] = useState<any>();
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(data.length / PAGE_SIZE);
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visibleData =
    selectedValues?.length === 0
      ? data?.slice(startIndex, startIndex + PAGE_SIZE)
      : selectedValues?.slice(startIndex, startIndex + PAGE_SIZE);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/dataset_large.csv");
      const reader = response?.body?.getReader();
      const result = await reader?.read();
      const decoder = new TextDecoder("utf-8");
      const csvData = decoder.decode(result?.value);
      const parsedData = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
      }).data;
      setData(parsedData);
    };
    fetchData();
  }, []);

  let mod350Data: any[] = [];
  if ((data && selectedValues?.length === 0) || selected350?.length > 0) {
    const modTest = data
      .slice(startIndex, startIndex + PAGE_SIZE)
      .map((dataX: any) => dataX.mod350);
    const unique = Array.from(new Set(modTest))?.sort(
      (a: any, b: any) => b - a
    );
    mod350Data = unique.map((data: any, i: any) => {
      return { name: data, id: i };
    });
  } else if (
    (selected350?.length === 0 && selected8000?.length > 0) ||
    (selected350?.length === 0 && selected20002?.length > 0)
  ) {
    const mod = data.filter((data1: any) =>
      selectedValues.map((data2: any) => data2.mod350).includes(data1.mod350)
    );
    const modTest = mod.map((dataX: any) => dataX.mod350);

    const unique = Array.from(new Set(modTest))?.sort(
      (a: any, b: any) => b - a
    );
    mod350Data = unique.map((data: any, i: any) => {
      return { name: data, id: i };
    });
  }
  let mod8000Data: any[] = [];
  if ((data && selectedValues?.length === 0) || selected8000?.length > 0) {
    const modTest = data
      .slice(startIndex, startIndex + PAGE_SIZE)
      .map((dataX: any) => dataX.mod8000)
      ?.sort((a: any, b: any) => b - a);
    const unique = Array.from(new Set(modTest));
    mod8000Data = unique.map((data: any, i: any) => {
      return { name: data, id: i };
    });
  } else if (
    (selected8000?.length === 0 && selected350?.length > 0) ||
    (selected8000?.length === 0 && selected20002?.length > 0)
  ) {
    const mod = data.filter((data1: any) =>
      selectedValues.map((data2: any) => data2.mod8000).includes(data1.mod8000)
    );
    const modTest = mod
      .map((dataX: any) => dataX.mod8000)
      ?.sort((a: any, b: any) => b - a);
    const unique = Array.from(new Set(modTest));
    mod8000Data = unique.map((data: any, i: any) => {
      return { name: data, id: i };
    });
  }

  let mod20002Data: any[] = [];
  if ((data && selectedValues?.length === 0) || selected20002?.length > 0) {
    const modTest = data
      .slice(startIndex, startIndex + PAGE_SIZE)
      .map((dataX: any) => dataX.mod20002)
      ?.sort((a: any, b: any) => b - a);
    const unique = Array.from(new Set(modTest));
    mod20002Data = unique.map((data: any, i: any) => {
      return { name: data, id: i };
    });
  } else if (
    (selected20002?.length === 0 && selected350?.length > 0) ||
    (selected20002?.length === 0 && selected8000?.length > 0)
  ) {
    const mod = data.filter((data1: any) =>
      selectedValues
        .map((data2: any) => data2.mod20002)
        .includes(data1.mod20002)
    );
    const modTest = mod
      .map((dataX: any) => dataX.mod20002)
      ?.sort((a: any, b: any) => b - a);
    const unique = Array.from(new Set(modTest));
    mod20002Data = unique.map((data: any, i: any) => {
      return { name: data, id: i };
    });
  }
  useEffect(() => {
    if (
      selectedValues?.length > 0 &&
      startIndex + PAGE_SIZE > selectedValues?.length
    ) {
      setEnd(selectedValues?.length);
    } else if (
      selectedValues?.length === 0 &&
      startIndex + PAGE_SIZE > data?.length
    ) {
      setEnd(data?.length);
    } else if (
      selectedValues?.length === 0 &&
      startIndex + PAGE_SIZE < data?.length
    ) {
      setEnd(startIndex + PAGE_SIZE);
    } else if (
      selectedValues?.length > 0 &&
      startIndex + PAGE_SIZE < selectedValues?.length
    ) {
      setEnd(startIndex + PAGE_SIZE);
    }
  }, [selectedValues, handleNextPage]);

  return (
    <div>
      <div className="w-[100%] py-[50px] px-[10%] flex flex-wrap">
        <div className="mr-[50px]">
          <Multiselectcomp
            placeholder={"mod350"}
            options={mod350Data}
            onSelect={(selectedList, selectedItem) => {
              const select = selectedList.map(({ name }) => name);
              setSelected350(selectedList);
              const testData = data.filter((data1: any) =>
                //@ts-ignore
                select.includes(data1?.mod350)
              );
              setSelectedValues(testData);
            }}
            onRemove={
              selected350?.length > 0
                ? (selectedList, removedItem) => {
                    const select = selectedList.map(({ name }) => name);

                    const testData = data.filter((data1: any) =>
                      //@ts-ignore
                      select.includes(data1?.mod350)
                    );
                    setSelectedValues(testData);
                  }
                : () => {}
            }
            selectedValues={
              (selected350?.length === 0 && selected20002?.length > 0) ||
              (selected350?.length === 0 && selected8000?.length > 0)
                ? mod350Data
                : []
            }
          ></Multiselectcomp>
        </div>
        <div className="mr-[50px]">
          <Multiselectcomp
            placeholder={"mod8000"}
            options={mod8000Data}
            onSelect={(selectedList, selectedItem) => {
              const select = selectedList.map(({ name }) => name);
              setSelected8000(selectedList);
              const testData = data.filter((data1: any) =>
                //@ts-ignore
                select.includes(data1?.mod8000)
              );
              setSelectedValues(testData);
            }}
            onRemove={
              selected8000?.length > 0
                ? (selectedList, removedItem) => {
                    const select = selectedList.map(({ name }) => name);
                    const testData = data.filter((data1: any) =>
                      //@ts-ignore
                      select.includes(data1?.mod8000)
                    );
                    setSelectedValues(testData);
                  }
                : () => {}
            }
            selectedValues={
              (selected8000?.length === 0 && selected20002?.length > 0) ||
              (selected8000?.length === 0 && selected350?.length > 0)
                ? mod8000Data
                : []
            }
          ></Multiselectcomp>
        </div>
        <Multiselectcomp
          placeholder={"mod20002"}
          options={mod20002Data}
          onSelect={(selectedList, selectedItem) => {
            const select = selectedList.map(({ name }) => name);
            setSelected20002(selectedList);
            const testData = data.filter((data1: any) =>
              //@ts-ignore
              select.includes(data1?.mod20002)
            );
            setSelectedValues(testData);
          }}
          onRemove={
            selected20002?.length > 0
              ? (selectedList, removedItem) => {
                  const select = selectedList.map(({ name }) => name);
                  console.log(selectedList);
                  const testData = data.filter((data1: any) =>
                    //@ts-ignore
                    select.includes(data1?.mod20002)
                  );
                  setSelectedValues(testData);
                }
              : () => {}
          }
          selectedValues={
            (selected20002?.length === 0 && selected350?.length > 0) ||
            (selected20002?.length === 0 && selected8000?.length > 0)
              ? mod20002Data
              : []
          }
        ></Multiselectcomp>
        {/* <div className="mr-[50px]">
          <Multiselectcomp></Multiselectcomp>
        </div> */}
      </div>

      <Table
        tableHead={["number", "mod350", "mod8000", "mod20002"]}
        tableRows={visibleData}
      ></Table>
      <div className="justify-end items-center mr-[50px]  flex">
        <p className="mx-[4px]">{`${startIndex + 1}-${end}`}/</p>
        <p>
          {selectedValues?.length > 0 ? selectedValues?.length : data?.length}
        </p>
        <div className="flex items-center">
          <p
            onClick={currentPage !== 1 ? handlePreviousPage : () => {}}
            className="font-bold text-[20px] cursor-pointer mx-[5px]"
          >
            {"<"}
          </p>
          <p
            onClick={
              currentPage ===
              Math.ceil(
                selectedValues?.length < 1
                  ? data.length
                  : selectedValues?.length / PAGE_SIZE
              )
                ? () => {}
                : handleNextPage
            }
            className="font-bold text-[20px] cursor-pointer"
          >
            {">"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
