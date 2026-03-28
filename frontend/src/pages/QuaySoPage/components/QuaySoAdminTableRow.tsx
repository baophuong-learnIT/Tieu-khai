import type { AdminUserRow } from '@/lib/api';

type QuaySoAdminTableRowProps = {
  row: AdminUserRow;
};

export function QuaySoAdminTableRow({ row }: QuaySoAdminTableRowProps) {
  return (
    <tr>
      <td>{row.r}</td>
      <td>{row.a}</td>
      <td className="a-user">{row.u}</td>
      <td className="a-spin">
        {row.remaining}/{row.allocated}
      </td>
    </tr>
  );
}
