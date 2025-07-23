import { useState, useEffect } from 'react';
import { ClientTable } from './components/ClientTable';
import { SortPanel } from './components/SortPanel';
import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Filter } from 'lucide-react';
import { Button } from './components/ui/button';
import type { Client, SortCriteria } from './types';

const App = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [sortCriteria, setSortCriteria] = useState<SortCriteria[]>([]);
  const [showSortPanel, setShowSortPanel] = useState(false);

  // Load mock data
  useEffect(() => {
    const mockClients: Client[] = [
      {
        id: 20,
        name: 'John Doe',
        type: 'individual',
        email: 'johndoe@email.com',
        createdAt: new Date('2023-01-15'),
        updatedAt: new Date('2023-06-20'),
      },
      {
        id: 21,
        name: 'Test Test',
        type: 'individual',
        email: 'test@test.com',
        createdAt: new Date('2023-02-10'),
        updatedAt: new Date('2023-05-15'),
      },
      {
        id: 22,
        name: 'Acme Corp',
        type: 'company',
        email: 'contact@acme.com',
        createdAt: new Date('2023-03-05'),
        updatedAt: new Date('2023-07-01'),
      },
      {
        id: 23,
        name: 'Jane Smith',
        type: 'individual',
        email: 'jane@smith.com',
        createdAt: new Date('2023-01-20'),
        updatedAt: new Date('2023-06-10'),
      },
      {
        id: 24,
        name: 'XYZ Ltd',
        type: 'company',
        email: 'info@xyz.com',
        createdAt: new Date('2023-04-12'),
        updatedAt: new Date('2023-07-05'),
      },
      {
        id: 25,
        name: 'Alice Johnson',
        type: 'individual',
        email: 'alice.johnson@example.com',
        createdAt: new Date('2023-05-18'),
        updatedAt: new Date('2023-08-22'),
      },
      {
        id: 26,
        name: 'Beta Solutions',
        type: 'company',
        email: 'contact@betasolutions.com',
        createdAt: new Date('2023-02-28'),
        updatedAt: new Date('2023-06-15'),
      },
      {
        id: 27,
        name: 'Charlie Brown',
        type: 'individual',
        email: 'charlie.brown@mail.com',
        createdAt: new Date('2023-06-10'),
        updatedAt: new Date('2023-07-25'),
      },
      {
        id: 28,
        name: 'Delta Enterprises',
        type: 'company',
        email: 'info@deltaent.com',
        createdAt: new Date('2023-01-05'),
        updatedAt: new Date('2023-08-10'),
      },
      {
        id: 29,
        name: 'Eva Martinez',
        type: 'individual',
        email: 'eva.martinez@email.org',
        createdAt: new Date('2023-07-20'),
        updatedAt: new Date('2023-08-05'),
      },
    ];
    setClients(mockClients);

    // Load sort criteria from localStorage if available
    const savedSort = localStorage.getItem('clientSortCriteria');
    if (savedSort) {
      setSortCriteria(JSON.parse(savedSort));
    }
  }, []);

  // Save sort criteria to localStorage when it changes
  useEffect(() => {
    if (sortCriteria.length > 0) {
      localStorage.setItem('clientSortCriteria', JSON.stringify(sortCriteria));
    }
  }, [sortCriteria]);

  // Handle drag and drop reordering
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    // If dropped on remove zone, remove the item
    if (over.id === 'remove-zone') {
      setSortCriteria((items) => items.filter((item) => item.id !== active.id));
      return;
    }

    // Otherwise, handle reordering
    if (active.id !== over.id) {
      setSortCriteria((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = [...items];
        const [removed] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, removed);
        return newItems;
      });
    }
  };

  const getSortValue = (client: Client, field: string) => {
    switch (field) {
      case 'name':
        return client.name;
      case 'email':
        return client.email;
      case 'type':
        return client.type;
      case 'createdAt':
        return client.createdAt.getTime();
      case 'updatedAt':
        return client.updatedAt.getTime();
      case 'id':
        return client.id;
      default:
        return '';
    }
  };

  // Apply sorting to clients
  const sortedClients = [...clients].sort((a, b) => {
    for (const criteria of sortCriteria) {
      const valueA = getSortValue(a, criteria.field);
      const valueB = getSortValue(b, criteria.field);

      if (valueA < valueB) return criteria.direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return criteria.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-6'>Clients</h1>

      <div className='flex mb-4 items-center justify-between'>
        <div className='flex items-center'>
          <h2 className='font-semibold mr-4'>All</h2>
          <div className='flex space-x-4'>
            <span className='text-sm'>Individual</span>
            <span className='text-sm'>Company</span>
          </div>
        </div>

        {/* Filter Button with Counter */}
        <Button
          variant='outline'
          onClick={() => setShowSortPanel(!showSortPanel)}
          className='relative'
        >
          <Filter className='h-4 w-4 mr-2' />
          Filter
          {sortCriteria.length > 0 && (
            <span className='absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
              {sortCriteria.length}
            </span>
          )}
        </Button>
      </div>

      <div className='relative'>
        <ClientTable clients={sortedClients} />

        {/* Sort Panel Overlay */}
        {showSortPanel && (
          <div className='absolute top-0 right-0 z-10'>
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={sortCriteria}
                strategy={verticalListSortingStrategy}
              >
                <SortPanel
                  sortCriteria={sortCriteria}
                  setSortCriteria={setSortCriteria}
                  onClose={() => setShowSortPanel(false)}
                />
              </SortableContext>
            </DndContext>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
