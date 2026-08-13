# ReusableAutoTable

Framework-agnostic React table based on the layout principle used in this admin:

- Native `<table>` markup.
- `table-layout: auto`, so browsers size columns from header and cell content.
- Configurable `minWidth`, so narrow containers scroll horizontally instead of crushing columns.
- Sticky header, loading row, empty row, row click handling, and an optional pagination footer.
- No `@nextui-org` dependency.

## Usage

Import both files:

```tsx
import { ReusableAutoTable, type TAutoTableColumn } from './ReusableAutoTable';
import './ReusableAutoTable.css';
```

Create columns with a renderer per cell:

```tsx
type UserRow = {
  id: number;
  email: string;
  status: 'active' | 'banned';
  createdAt: string;
};

const columns: TAutoTableColumn<UserRow>[] = [
  {
    key: 'email',
    header: 'User',
    render: (row) => row.email,
  },
  {
    key: 'status',
    header: 'Status',
    render: (row) => row.status,
  },
  {
    key: 'createdAt',
    header: 'Created',
    render: (row) => new Date(row.createdAt).toLocaleDateString(),
  },
];

export const UsersExample = ({
  rows,
  page,
  totalPages,
  setPage,
}: {
  rows: UserRow[];
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}) => (
  <ReusableAutoTable
    ariaLabel="Users"
    columns={columns}
    rows={rows}
    getRowKey={(row) => row.id}
    minWidth={1000}
    currentPage={page}
    totalPages={totalPages}
    onPageChange={setPage}
    footerStart={`Showing ${rows.length} users`}
  />
);
```

## Column Width Logic

This component intentionally does not assign fixed widths to columns. The browser calculates each column from the table content because the CSS uses:

```css
table-layout: auto;
min-width: 1000px;
```

If the parent is narrower than `minWidth`, `.autoTableScroll` provides horizontal scrolling.
