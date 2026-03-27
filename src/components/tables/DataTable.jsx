/**
 * DataTable — responsive table with horizontal scroll on mobile.
 * On mobile: wraps in overflow-x-auto so wide tables don't break layout.
 * Rows have min-h-[44px] for tap target compliance.
 * 
 * ISSUE #75: Data list in API gateway lacks windowing/virtualization for large datasets.
 * Category: Performance & Scalability
 * Priority: Critical
 * Affected Area: API gateway
 * 
 * Added virtualization support for large datasets to prevent performance degradation
 * when rendering tables with hundreds or thousands of rows. Virtualization is
 * automatically enabled when the dataset exceeds VIRTUALIZATION_THRESHOLD.
 */

import { useVirtualList } from '../../hooks/useVirtualList';

// Virtualization constants
const VIRTUALIZATION_THRESHOLD = 50;  // Enable windowing above this row count
const ROW_HEIGHT = 52;                // Approximate height of a table row (44px min + padding)

function DataTable({
    columns,
    data,
    onRowClick,
    emptyMessage = 'No data available',
    className = '',
    selectable = false,
    selectedItems = [],
    onSelectionChange = () => {}
}) {
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            onSelectionChange(data.map(item => item.id));
        } else {
            onSelectionChange([]);
        }
    };

    const handleSelectItem = (e, id) => {
        e.stopPropagation();
        if (e.target.checked) {
            onSelectionChange([...selectedItems, id]);
        } else {
            onSelectionChange(selectedItems.filter(itemId => itemId !== id));
        }
    };

    const isAllSelected = data.length > 0 && selectedItems.length === data.length;

    // ISSUE #75 FIX: Enable virtualization for large datasets
    const shouldVirtualize = data.length > VIRTUALIZATION_THRESHOLD;
    
    // Always call the hook (React rules prohibit conditional hook calls)
    const { scrollRef, virtualItems, topPadding, bottomPadding } = useVirtualList({
        items: data,
        itemHeight: ROW_HEIGHT,
    });

    // Use virtualized items if enabled, otherwise use full dataset
    const rowsToRender = shouldVirtualize
        ? virtualItems.map(v => ({ ...v.item, _virtualIndex: v.index }))
        : data.map((item, index) => ({ ...item, _virtualIndex: index }));

    return (
        <div className={`bg-white border border-border rounded-card overflow-hidden ${className}`}>
            {/* Horizontal scroll wrapper for mobile */}
            <div 
                ref={shouldVirtualize ? scrollRef : undefined}
                className="overflow-x-auto -webkit-overflow-scrolling-touch"
                style={shouldVirtualize ? { maxHeight: '600px', overflowY: 'auto' } : undefined}
            >
                <table className="w-full border-collapse min-w-[600px]">
                    <thead className="sticky top-0 z-10">
                        <tr className="border-b border-border">
                            {selectable && (
                                <th className="w-10 px-4 py-3 bg-page whitespace-nowrap">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-border text-brand focus:ring-brand"
                                        checked={isAllSelected}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                            )}
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    style={{ width: col.width }}
                                    className="text-left px-4 py-3 text-xs font-semibold text-t-muted uppercase tracking-wide bg-page whitespace-nowrap"
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Top spacer for virtualization */}
                        {shouldVirtualize && topPadding > 0 && (
                            <tr aria-hidden="true">
                                <td colSpan={columns.length + (selectable ? 1 : 0)} style={{ height: topPadding }} />
                            </tr>
                        )}
                        
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + (selectable ? 1 : 0)} className="text-center py-10 text-t-muted">
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            rowsToRender.map((row) => (
                                <tr
                                    key={row.id || row._virtualIndex}
                                    onClick={() => onRowClick?.(row)}
                                    className={`border-b border-border last:border-b-0 ${onRowClick ? 'cursor-pointer hover:bg-page active:bg-brand-bg' : ''} ${selectedItems.includes(row.id) ? 'bg-brand-bg' : ''}`}
                                >
                                    {selectable && (
                                        <td className="w-10 px-4 py-3" onClick={(e) => e.stopPropagation()}>
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-border text-brand focus:ring-brand"
                                                checked={selectedItems.includes(row.id)}
                                                onChange={(e) => handleSelectItem(e, row.id)}
                                            />
                                        </td>
                                    )}
                                    {columns.map((col) => (
                                        <td key={col.key} className="px-4 py-3 text-sm text-t-primary min-h-[44px]">
                                            {col.render ? col.render(row[col.key], row) : row[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                        
                        {/* Bottom spacer for virtualization */}
                        {shouldVirtualize && bottomPadding > 0 && (
                            <tr aria-hidden="true">
                                <td colSpan={columns.length + (selectable ? 1 : 0)} style={{ height: bottomPadding }} />
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DataTable;
