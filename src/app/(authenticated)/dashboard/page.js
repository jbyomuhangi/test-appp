"use client";

import DataTable from "@/components/DataTable";
import StandardCell from "@/components/DataTable/Cells/StandardCell";
import FlexBox from "@/components/FlexBox";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Page = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const response = await fetch("/api/getData");
      const { data } = await response.json();

      return data;
    },
  });

  const columns = React.useMemo(() => {
    return [
      {
        id: "id",
        label: "ID",
        CellRenderer: ({ item }) => {
          return <StandardCell data={item.id} />;
        },
      },
      {
        id: "name",
        label: "Name",
        CellRenderer: ({ item }) => {
          return <StandardCell data={item.name} />;
        },
      },
      {
        id: "age",
        label: "Age",
        CellRenderer: ({ item }) => {
          return <StandardCell data={item.age} />;
        },
      },
    ];
  }, []);

  if (isLoading) {
    return (
      <FlexBox
        BoxProps={{
          sx: {
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          },
        }}
      >
        <CircularProgress />
      </FlexBox>
    );
  }

  return (
    <FlexBox>
      <DataTable columns={columns} data={data || []} />
    </FlexBox>
  );
};

export default Page;
