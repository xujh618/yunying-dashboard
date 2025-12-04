import React from 'react';

const DataTable = ({ columns, data, onDelete }) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.label}</th>
            ))}
            {onDelete && <th>操作</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => {
                const value = row[column.key];
                return (
                  <td key={colIndex}>
                    {typeof column.render === 'function' ? column.render(value, row) : value}
                  </td>
                );
              })}
              {onDelete && (
                <td>
                  <button
                    onClick={() => onDelete(row)}
                    className="text-red-600 hover:text-red-800"
                  >
                    删除
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
