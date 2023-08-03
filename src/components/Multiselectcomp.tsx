import Multiselect from "multiselect-react-dropdown";

type Multiprops = {
  options: any[];
  selectedValues: any[];
  onSelect?: (a: [], b: string) => void;
  onRemove?: (a: [], b: string) => void;
  placeholder: string;
};

const Multiselectcomp = ({
  options,
  selectedValues,
  placeholder,
  onRemove,
  onSelect,
}: Multiprops) => {
  return (
    <Multiselect
      showCheckbox={true}
      selectedValues={selectedValues}
      placeholder={placeholder}
      options={options}
      onSelect={onSelect}
      onRemove={onRemove}
      displayValue="name"
      
    ></Multiselect>
  );
};

export default Multiselectcomp;
