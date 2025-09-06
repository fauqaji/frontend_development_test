"use client";

import { useEffect, useMemo, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog"; // 1. Impor komponen dialog

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

  useEffect(() => {
    const raw = localStorage.getItem("addedComments");
    if (raw) {
      const extras: Comment[] = JSON.parse(raw);
      setData((prev) => {
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

  // Fungsi delete tetap sama, sekarang dipanggil setelah konfirmasi
  const deleteRow = (id: number) => {
    setData((d) => d.filter((c) => c.id !== id));
    const raw = localStorage.getItem("addedComments");
    if (raw) {
      const extras: Comment[] = JSON.parse(raw).filter(
        (c: Comment) => c.id !== id
      );
      localStorage.setItem("addedComments", JSON.stringify(extras));
    }
  };

  // 2. Buat fungsi untuk menampilkan dialog konfirmasi
  const confirmDelete = (id: number) => {
    confirmDialog({
      message: "Apakah Anda yakin ingin menghapus data ini?",
      header: "Konfirmasi Hapus",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => deleteRow(id), // Jalankan deleteRow jika "Yes" ditekan
      reject: () => {}, // Tidak melakukan apa-apa jika "No" ditekan
    });
  };

  // 3. Ubah tombol Delete untuk memanggil fungsi konfirmasi
  const actionBody = (row: Comment) => (
    <Button
      label="Delete"
      onClick={() => confirmDelete(row.id)}
      className="p-button-danger"
    />
  );

  return (
    <div className="space-y-3">
      {/* 4. Tambahkan komponen ConfirmDialog di sini */}
      <ConfirmDialog />

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
