// client/src/components/mandor/MandorDetailDrawer.jsx
import React from "react";
import { X, Mail, Phone, MapPin, User, Calendar } from "lucide-react";

import Drawer from "../common/Drawer";
import Button from "../common/Button";
import IconButton from "../common/IconButton";
import DetailItem from "../common/DetailItem";
import ProfileSection from "../common/ProfileSection";

export default function MandorDetailDrawer({ isOpen, onClose, mandor }) {
  if (!mandor) return null;

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-heading-s-bold text-primary-main">Detail Mandor</h2>
        <IconButton icon={<X size={22} />} onClick={onClose} />
      </div>

      {/* PROFILE */}
      <ProfileSection
        foto={mandor.foto !== "NULL" ? mandor.foto : `https://placehold.co/200`}
        nama={mandor.nama_lengkap}
        role={mandor.status_aktif ? "Aktif" : "Non-Aktif"}
      />

      {/* DETAILS */}
      <div className="space-y-4 mt-4">
        <DetailItem
          icon={<User />}
          label="ID Mandor"
          value={mandor.kode_mandor}
        />
        <DetailItem icon={<User />} label="NIK" value={mandor.nik} />
        <DetailItem icon={<Mail />} label="Email" value={mandor.email || "-"} />
        <DetailItem
          icon={<Phone />}
          label="Nomor HP"
          value={mandor.no_hp || "-"}
        />
        <DetailItem
          icon={<MapPin />}
          label="Alamat"
          value={mandor.alamat || "-"}
        />
        <DetailItem
          icon={<User />}
          label="Pengalaman (Tahun)"
          value={mandor.pengalaman_tahun || 0}
        />
        <DetailItem
          icon={<Calendar />}
          label="Tanggal Ditambahkan"
          value={new Date(mandor.tanggal_ditambahkan).toLocaleDateString()}
        />
      </div>

      {/* CLOSE BUTTON */}
      <div className="mt-8 text-center">
        <Button onClick={onClose}>Tutup</Button>
      </div>
    </Drawer>
  );
}
