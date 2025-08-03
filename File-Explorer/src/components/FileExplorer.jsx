import React, { useState } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    defaultDropAnimation,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import { Item } from './Item';

const FileExplorer = () => {
    const [activeId, setActiveId] = useState(null);
    const [items, setItems] = useState([
        {
            id: 'folder-1',
            name: 'Documents',
            type: 'folder',
            children: [
                { id: 'file-1', name: 'Document.pdf', type: 'file' },
                { id: 'file-2', name: 'Report.docx', type: 'file' },
            ],
        },
        {
            id: 'folder-2',
            name: 'Images',
            type: 'folder',
            children: [
                { id: 'file-3', name: 'Vacation.jpg', type: 'file' },
            ],
        },
        { id: 'file-4', name: 'README.md', type: 'file' },
    ]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    );

    const getItem = (id) => {
        // Check top level items
        const topLevelItem = items.find(item => item.id === id);
        if (topLevelItem) return topLevelItem;

        // Check nested items
        for (const folder of items.filter(item => item.type === 'folder')) {
            const childItem = folder.children.find(child => child.id === id);
            if (childItem) return childItem;
        }

        return null;
    };

    const findParent = (id) => {
        if (items.some(item => item.id === id)) return { container: 'root' };

        for (const folder of items.filter(item => item.type === 'folder')) {
            if (folder.children.some(child => child.id === id)) {
                return { container: folder.id, index: folder.children.findIndex(child => child.id === id) };
            }
        }

        return null;
    };

    const handleDragStart = (event) => {
        const { active } = event;
        setActiveId(active.id);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            setActiveId(null);
            return;
        }

        const activeParent = findParent(active.id);
        const overParent = findParent(over.id);

        // Moving within the same container
        if (activeParent.container === overParent.container) {
            if (activeParent.container === 'root') {
                // Reorder top level items
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);

                setItems(arrayMove(items, oldIndex, newIndex));
            } else {
                // Reorder within folder
                const folderIndex = items.findIndex(item => item.id === activeParent.container);
                const folder = items[folderIndex];
                const oldIndex = folder.children.findIndex(child => child.id === active.id);
                const newIndex = folder.children.findIndex(child => child.id === over.id);

                const newItems = [...items];
                newItems[folderIndex] = {
                    ...folder,
                    children: arrayMove(folder.children, oldIndex, newIndex),
                };

                setItems(newItems);
            }
        }
        // Moving between containers
        else {
            // Remove from old parent
            let activeItem;
            const newItems = [...items];

            if (activeParent.container === 'root') {
                const activeIndex = items.findIndex(item => item.id === active.id);
                activeItem = newItems[activeIndex];
                newItems.splice(activeIndex, 1);
            } else {
                const folderIndex = items.findIndex(item => item.id === activeParent.container);
                const folder = newItems[folderIndex];
                activeItem = folder.children[activeParent.index];
                newItems[folderIndex] = {
                    ...folder,
                    children: folder.children.filter(child => child.id !== active.id),
                };
            }

            // Add to new parent
            if (overParent.container === 'root') {
                const overIndex = items.findIndex(item => item.id === over.id);
                newItems.splice(overIndex, 0, activeItem);
            } else {
                const folderIndex = items.findIndex(item => item.id === overParent.container);
                const folder = newItems[folderIndex];
                const overIndex = folder.children.findIndex(child => child.id === over.id);

                newItems[folderIndex] = {
                    ...folder,
                    children: [
                        ...folder.children.slice(0, overIndex),
                        activeItem,
                        ...folder.children.slice(overIndex),
                    ],
                };
            }

            setItems(newItems);
        }

        setActiveId(null);
    };

    const dropAnimation = {
        ...defaultDropAnimation,
        dragSourceOpacity: 0.5,
    };

    return (
        <div className="file-explorer" style={{ padding: '20px', maxWidth: '400px' }}>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={items.map(item => item.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {items.map(item => (
                        <SortableItem
                            key={item.id}
                            id={item.id}
                            item={item}
                            isFolder={item.type === 'folder'}
                        >
                            {item.type === 'folder' && item.children && (
                                <div style={{ marginLeft: '20px', marginTop: '8px' }}>
                                    <SortableContext
                                        items={item.children.map(child => child.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {item.children.map(child => (
                                            <SortableItem
                                                key={child.id}
                                                id={child.id}
                                                item={child}
                                                isFolder={false}
                                            />
                                        ))}
                                    </SortableContext>
                                </div>
                            )}
                        </SortableItem>
                    ))}
                </SortableContext>

                <DragOverlay dropAnimation={dropAnimation}>
                    {activeId ? (
                        <Item
                            item={getItem(activeId)}
                            isFolder={getItem(activeId)?.type === 'folder'}
                            isDragging
                        />
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
};

export default FileExplorer;