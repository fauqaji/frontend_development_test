"use client";

import { useEffect, useMemo, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export default function CommentsTable({
  initialData,
}: {
  initialData: Comment[];
}) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [data, setData] = useState<Comment[]>(initialData ?? []);

  // Merge created items dari localStorage (agar terlihat di tabel setelah submit)
  useEffect(() => {
    const raw = localStorage.getItem("addedComments");
    if (raw) {
      const extras: Comment[] = JSON.parse(raw);
      setData((prev) => {
        // gabung tapi hilangkan duplikat berdasarkan id
        const merged = [...extras, ...prev].filter(
          (item, index, self) =>
            index === self.findIndex((c) => c.id === item.id)
        );
        return merged;
      });
    }
  }, []);

  const filtered = useMemo(() => {
    const q = globalFilter.toLowerCase();
    if (!q) return data;
    return data.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.body.toLowerCase().includes(q)
    );
  }, [globalFilter, data]);

  const deleteRow = (id: number) => {
    setData((d) => d.filter((c) => c.id !== id));
    // kalau yang dihapus adalah item tambahan (localStorage), sinkronkan
    const raw = localStorage.getItem("addedComments");
    if (raw) {
      const extras: Comment[] = JSON.parse(raw).filter(
        (c: Comment) => c.id !== id
      );
      localStorage.setItem("addedComments", JSON.stringify(extras));
    }
  };

  const actionBody = (row: Comment) => (
    <Button
      label="Delete"
      onClick={() => deleteRow(row.id)}
      className="p-button-danger"
    />
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search name/email/body"
            className="w-72 max-w-full"
          />
        </span>
      </div>

      <DataTable
        value={filtered}
        paginator
        rows={10}
        removableSort
        className="rounded-xl"
        stripedRows
        tableStyle={{ minWidth: "50rem" }}
        responsiveLayout="scroll"
      >
        <Column field="id" header="ID" sortable style={{ width: "80px" }} />
        <Column field="name" header="Name" sortable />
        <Column field="email" header="Email" sortable />
        <Column field="body" header="Body" />
        <Column header="Action" body={actionBody} style={{ width: "120px" }} />
      </DataTable>
    </div>
  );
}
