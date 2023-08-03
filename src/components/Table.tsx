type TableData = {
  number: string;
  mod350: number;
  mod8000: number;
  mod20002: number;
};

type Tableprops = {
  tableHead?: string[];
  tableRows?: TableData[];
  rowData?: string[];
};

const Table = ({ tableHead, tableRows, rowData }: Tableprops) => {
  return (
    <div className="w-[100%] mt-[30px] h-[70vh] overflow-hidden flex justify-center">
      <div className="h-[90%] w-[100%] overflow-y-scroll">
        <table className="!w-[100%] ">
          <thead className="w-[100%]">
            <tr className="w-[100%]">
              {tableHead?.map((data, i) => (
                <th key={i} className="w-[25%]">
                  {data}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="w-[100%]">
            {tableRows?.map((data, i) => (
              <tr className="w-[100%]">
                <td className="w-[25%] py-[5px] text-center">{data?.number}</td>
                <td className="w-[25%] text-center">{data?.mod350}</td>
                <td className="w-[25%] text-center">{data?.mod8000}</td>
                <td className="w-[25%] text-center">{data?.mod20002}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
