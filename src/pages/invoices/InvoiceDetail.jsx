/**
 * Issue #83: Missing request debouncing on the search input in InvoiceDetail.
 * Category: Performance & Scalability
 * * This fix introduces a debounced search filter for invoice line items to
 * optimize rendering performance and improve UX for large invoices.
 */
import { useRef, useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Send, Download, Edit, Eye, Search } from "lucide-react";
import Button from "../../components/forms/Button";
import StatusBadge from "../../components/tables/StatusBadge";
import InvoiceLayout from "../../components/invoice/InvoiceLayout";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import { useDebounce } from "../../hooks/useDebounce"; // New hook
import { formatUtcDate } from "../../utils/date";

function InvoiceDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const invoiceRef = useRef(null);
    const { user } = useAuth();
    const { invoices, customers } = useData();
    const invoice = invoices.find(inv => inv.id === id);
    const customer = customers.find(c => c.id === invoice?.customerId);

    // #21: bail out early if the session expired while the page was open
    useEffect(() => {
        if (!loadSession()) {
            navigate('/signin?reason=expired', { replace: true });
        }
    }, [navigate]);

    if (!invoice) return <div className="p-8"><p className="text-t-muted">Invoice not found</p></div>;

    const sender = {
        name: user?.name || 'Tradazone',
        email: user?.email || 'hello@tradazone.com',
    };

  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  const invoice = invoices.find((inv) => inv.id === id);
  const customer = customers.find((c) => c.id === invoice?.customerId);

  /**
   * Filtered items list - Memoized to prevent recalculation on every render
   * only triggers when the debounced value or the invoice data changes.
   */
  const filteredItems = useMemo(() => {
    if (!invoice) return [];
    if (!debouncedSearch.trim()) return invoice.items;

    const term = debouncedSearch.toLowerCase();
    return invoice.items.filter((item) =>
      item.name.toLowerCase().includes(term),
    );
  }, [invoice, debouncedSearch]);

  if (!invoice)
    return (
      <div className="p-8">
        <p className="text-t-muted">Invoice not found</p>
      </div>
    );

  const sender = {
    name: user?.name || "Tradazone",
    email: user?.email || "hello@tradazone.com",
  };

  const calculateTotal = () => {
    return invoice.items.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0,
    );
  };

  const handleDownload = async () => {
    const html2pdf = (await import("html2pdf.js")).default;
    const element = invoiceRef.current;

    const options = {
      margin: 0,
      filename: `${invoice.id}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <Link
            to="/invoices"
            className="inline-flex items-center gap-1.5 text-sm text-t-muted hover:text-brand transition-colors mb-2"
          >
            <ArrowLeft size={16} /> Back to Invoices
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-t-primary">
              {invoice.id}
            </h1>
            <StatusBadge status={invoice.status} />
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            icon={Eye}
            onClick={() => navigate(`/invoice/${invoice.id}`)}
          >
            View Invoice
          </Button>
          <Button variant="secondary" icon={Download} onClick={handleDownload}>
            Download
          </Button>
          <Button variant="secondary" icon={Send}>
            Send
          </Button>
          <Button variant="primary" icon={Edit}>
            Edit
          </Button>
        </div>
      </div>

      <div className="bg-white border border-border rounded-card p-6 mb-5">
        <h2 className="text-base font-semibold mb-4">Invoice Details</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div>
            <span className="block text-xs text-t-muted mb-1">Customer</span>
            <span className="text-sm font-medium">{invoice.customer}</span>
          </div>
          <div>
            <span className="block text-xs text-t-muted mb-1">Email</span>
            <span className="text-sm font-medium">
              {customer?.email || "N/A"}
            </span>
          </div>
          <div>
            <span className="block text-xs text-t-muted mb-1">Due Date</span>
            <span className="text-sm font-medium">
              {formatUtcDate(invoice.dueDate)}
            </span>
          </div>
          <div>
            <span className="block text-xs text-t-muted mb-1">Created</span>
            <span className="text-sm font-medium">
              {formatUtcDate(invoice.createdAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-border rounded-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-base font-semibold">Items</h2>

          {/* Search Input for filtering line items */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-t-muted"
              size={16}
            />
            <input
              type="text"
              placeholder="Filter items by name..."
              className="pl-10 pr-4 py-2 text-sm border border-border rounded-md w-full sm:w-64 focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-6 py-3 text-xs font-semibold text-t-muted uppercase tracking-wide bg-page">
                Item
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-t-muted uppercase tracking-wide bg-page">
                Quantity
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-t-muted uppercase tracking-wide bg-page">
                Price
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-t-muted uppercase tracking-wide bg-page">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-border last:border-b-0 hover:bg-page/50 transition-colors"
                >
                  <td className="px-6 py-3 text-sm font-medium">{item.name}</td>
                  <td className="px-6 py-3 text-sm">{item.quantity}</td>
                  <td className="px-6 py-3 text-sm">{item.price} STRK</td>
                  <td className="px-6 py-3 text-sm font-medium">
                    {parseFloat(item.price) * item.quantity} STRK
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <p className="text-sm text-t-muted">
                    No items found matching "{debouncedSearch}"
                  </p>
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-border">
              <td
                colSpan={3}
                className="px-6 py-4 text-sm font-semibold text-right"
              >
                Total:
              </td>
              <td className="px-6 py-4 text-sm font-bold text-brand">
                {calculateTotal()} STRK
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="fixed left-[-9999px] top-0">
        <InvoiceLayout
          ref={invoiceRef}
          invoice={invoice}
          customer={customer}
          sender={sender}
        />
      </div>
    </div>
  );
}

export default InvoiceDetail;
