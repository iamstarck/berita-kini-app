import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

type SearchBarProps = {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
};

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <InputGroup className="lg:w-fit">
      <InputGroupInput
        type="text"
        placeholder="Cari berita..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="placeholder:text-base"
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
};

export default SearchBar;
