"use client";

import { deleteTeam } from "@/actions/deleteTeam";
import { Button } from "../../ui/button";
import { useToast } from "../../ui/use-toast";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { CardDescription } from "../../ui/card";

interface DeleteTeamButtonProps {
  id: string;
}

export function DeleteTeamButton({ id }: DeleteTeamButtonProps) {
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async () => {
    const { success, data, error } = await deleteTeam(id);

    if (success && data) {
      toast({
        title: "Delete Success",
        description: data,
      });

      router.replace("/");
    } else {
      toast({
        title: "Delete Error",
        description: error,
      });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" type="button">
          Delete
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-y-1.5 w-auto">
        <CardDescription>{"There's no going back.."}</CardDescription>
        <Button variant="destructive" type="button" onClick={handleSubmit}>
          Confirm Delete
        </Button>
      </PopoverContent>
    </Popover>
  );
}
