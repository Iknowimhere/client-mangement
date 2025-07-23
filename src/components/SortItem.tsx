import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, ArrowUp, ArrowDown, X } from 'lucide-react';
import { Button } from './ui/button';
import type { SortCriteria } from '../types';

interface SortItemProps {
  criteria: SortCriteria;
  onRemove: (id: string) => void;
  onToggleDirection: (id: string) => void;
}

export const SortItem = ({
  criteria,
  onRemove,
  onToggleDirection,
}: SortItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: criteria.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className='flex items-center justify-between p-2 border border-gray-200 rounded-md'
    >
      <div className='flex items-center'>
        <button
          {...attributes}
          {...listeners}
          className='p-1 rounded hover:bg-gray-200 cursor-grab active:cursor-grabbing'
        >
          <GripVertical className='h-4 w-4 text-gray-400' />
        </button>
        <span className='text-sm ml-2'>{criteria.label}</span>
      </div>
      <div className='flex'>
        <Button
          variant='ghost'
          size='sm'
          className='h-6 w-6 p-1'
          onClick={() => onToggleDirection(criteria.id)}
        >
          {criteria.direction === 'asc' ? (
            <ArrowUp className='h-3 w-3' />
          ) : (
            <ArrowDown className='h-3 w-3' />
          )}
        </Button>
        <Button
          variant='ghost'
          size='sm'
          className='h-6 w-6 p-1'
          onClick={() => onRemove(criteria.id)}
        >
          <X className='h-3 w-3' />
        </Button>
      </div>
    </div>
  );
};
