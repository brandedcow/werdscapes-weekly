import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "../ui/command";

export function SearchIconButton() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button asChild variant="outline" size="icon">
          <Search />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Command>
          <CommandInput placeholder="Search for a player or team..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup></CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
