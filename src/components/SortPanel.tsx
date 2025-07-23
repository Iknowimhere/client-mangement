import { SortItem } from './SortItem';
import { Button } from './ui/button';
import { X, ChevronUp, ChevronDown, Trash2 } from 'lucide-react';
import { useDroppable } from '@dnd-kit/core';
import type { SortCriteria } from '../types';

interface SortPanelProps {
  sortCriteria: SortCriteria[];
  setSortCriteria: React.Dispatch<React.SetStateAction<SortCriteria[]>>;
  onClose?: () => void;
}

export const SortPanel = ({
  sortCriteria,
  setSortCriteria,
  onClose,
}: SortPanelProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'remove-zone',
  });

  const sortFields = [
    { field: 'name', label: 'Client Name', ascLabel: 'A-Z', descLabel: 'Z-A' },
    { field: 'email', label: 'Email', ascLabel: 'A-Z', descLabel: 'Z-A' },
    { field: 'type', label: 'Client Type', ascLabel: 'A-Z', descLabel: 'Z-A' },
    {
      field: 'createdAt',
      label: 'Created At',
      ascLabel: 'Oldest First',
      descLabel: 'Newest First',
    },
    {
      field: 'updatedAt',
      label: 'Updated At',
      ascLabel: 'Oldest First',
      descLabel: 'Newest First',
    },
    {
      field: 'id',
      label: 'Client ID',
      ascLabel: 'Low to High',
      descLabel: 'High to Low',
    },
  ];

  const addSortCriteria = (field: string, label: string) => {
    const sortField = sortFields.find((f) => f.field === field);
    const newCriteria: SortCriteria = {
      id: `${field}-${Date.now()}`,
      field: field,
      direction: 'asc', // Default to ascending
      label: `${label} (${sortField?.ascLabel || 'A-Z'})`, // Use appropriate label
    };
    setSortCriteria((prev) => [...prev, newCriteria]);
  };

  const removeSortCriteria = (id: string) => {
    setSortCriteria((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleDirection = (id: string) => {
    setSortCriteria((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const field = sortFields.find((f) => f.field === item.field);
          const newDirection = item.direction === 'asc' ? 'desc' : 'asc';
          const newLabel =
            newDirection === 'asc'
              ? `${field?.label} (${field?.ascLabel})`
              : `${field?.label} (${field?.descLabel})`;

          return {
            ...item,
            direction: newDirection,
            label: newLabel,
          };
        }
        return item;
      })
    );
  };

  const clearAll = () => {
    setSortCriteria([]);
  };

  return (
    <div className='bg-white rounded-lg border border-gray-200 shadow-lg p-4 w-[800px]'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='font-semibold'>Sort By</h3>
        {onClose && (
          <Button
            variant='ghost'
            size='sm'
            onClick={onClose}
            className='h-6 w-6 p-0'
          >
            <X className='h-4 w-4' />
          </Button>
        )}
      </div>

      {/* Two Column Layout */}
      <div className='flex gap-6'>
        {/* Left Column: Selected Sort Criteria */}
        <div className='flex-1'>
          <h4 className='text-sm font-medium text-gray-700 mb-2'>
            Selected Sorts
          </h4>
          {sortCriteria.length > 0 ? (
            <>
              <div className='space-y-2 mb-4'>
                {sortCriteria.map((criteria) => (
                  <SortItem
                    key={criteria.id}
                    criteria={criteria}
                    onRemove={removeSortCriteria}
                    onToggleDirection={toggleDirection}
                  />
                ))}
              </div>

              {/* Drop Zone for Removing Items */}
              <div
                ref={setNodeRef}
                className={`p-3 border-2 border-dashed rounded-lg text-center transition-colors ${
                  isOver
                    ? 'bg-red-100 border-red-400 text-red-700'
                    : 'bg-gray-50 border-gray-300 hover:bg-red-50 hover:border-red-300'
                }`}
              >
                <div
                  className={`flex items-center justify-center gap-2 ${
                    isOver ? 'text-red-700' : 'text-gray-500 hover:text-red-500'
                  }`}
                >
                  <Trash2 className='h-4 w-4' />
                  <span className='text-sm'>
                    {isOver ? 'Drop to remove' : 'Drag here to remove sort'}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className='text-gray-500 text-sm py-8 text-center border-2 border-dashed border-gray-200 rounded-lg'>
              No sorts selected
              <br />
              <span className='text-xs'>Choose from available options →</span>
            </div>
          )}
        </div>

        {/* Vertical Divider */}
        <div className='w-px bg-gray-200'></div>

        {/* Right Column: Available Options */}
        <div className='flex-1'>
          <h4 className='text-sm font-medium text-gray-700 mb-2'>
            Available Sort Options
          </h4>
          <div className='space-y-1'>
            {sortFields.map((sortField) => {
              const selectedCriteria = sortCriteria.find(
                (criteria) => criteria.field === sortField.field
              );
              const isSelected = !!selectedCriteria;

              return (
                <div
                  key={sortField.field}
                  className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    isSelected
                      ? 'bg-blue-50 border border-blue-200'
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <div className='flex items-center justify-between'>
                    <button
                      className={`text-left flex-1 ${
                        isSelected
                          ? 'text-blue-900 font-medium'
                          : 'hover:text-blue-600'
                      } transition-colors`}
                      onClick={() => {
                        if (!isSelected) {
                          // Add with default ascending direction
                          addSortCriteria(sortField.field, sortField.label);
                        }
                      }}
                      disabled={isSelected}
                    >
                      {sortField.label}
                    </button>
                    <div className='flex gap-1'>
                      {/* ASC Pill */}
                      <button
                        className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 transition-colors cursor-pointer hover:opacity-80 ${
                          isSelected && selectedCriteria?.direction === 'asc'
                            ? 'bg-blue-200 text-blue-800 border border-blue-300'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (
                            isSelected &&
                            selectedCriteria?.direction === 'asc'
                          ) {
                            // If already selected with asc, remove it
                            removeSortCriteria(selectedCriteria.id);
                          } else if (
                            isSelected &&
                            selectedCriteria?.direction === 'desc'
                          ) {
                            // If selected with desc, toggle to asc
                            toggleDirection(selectedCriteria.id);
                          } else {
                            // If not selected, add with asc direction
                            addSortCriteria(sortField.field, sortField.label);
                          }
                        }}
                      >
                        {sortField.ascLabel}
                        <ChevronUp className='h-3 w-3' />
                      </button>
                      {/* DESC Pill */}
                      <button
                        className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 transition-colors cursor-pointer hover:opacity-80 ${
                          isSelected && selectedCriteria?.direction === 'desc'
                            ? 'bg-blue-200 text-blue-800 border border-blue-300'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (
                            isSelected &&
                            selectedCriteria?.direction === 'desc'
                          ) {
                            // If already selected with desc, remove it
                            removeSortCriteria(selectedCriteria.id);
                          } else if (
                            isSelected &&
                            selectedCriteria?.direction === 'asc'
                          ) {
                            // If selected with asc, toggle to desc
                            toggleDirection(selectedCriteria.id);
                          } else {
                            // If not selected, add with desc direction
                            const newCriteria: SortCriteria = {
                              id: `${sortField.field}-${Date.now()}`,
                              field: sortField.field,
                              direction: 'desc',
                              label: `${sortField.label} (${sortField.descLabel})`,
                            };
                            setSortCriteria((prev) => [...prev, newCriteria]);
                          }
                        }}
                      >
                        {sortField.descLabel}
                        <ChevronDown className='h-3 w-3' />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className='flex justify-between pt-4 border-t border-gray-200'>
        <Button
          variant='outline'
          onClick={clearAll}
          disabled={sortCriteria.length === 0}
          size='sm'
        >
          Clear all
        </Button>
        <Button
          disabled={sortCriteria.length === 0}
          size='sm'
          onClick={onClose}
        >
          Apply ({sortCriteria.length})
        </Button>
      </div>
    </div>
  );
};
