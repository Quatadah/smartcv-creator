import { motion, AnimatePresence } from "framer-motion";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { GripVertical } from "lucide-react";

interface DraggableSectionProps {
  items: any[];
  onDragEnd: (result: any) => void;
  renderItem: (item: any, index: number) => React.ReactNode;
}

export function DraggableSection({
  items,
  onDragEnd,
  renderItem,
}: DraggableSectionProps) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <AnimatePresence>
              {items.map((item, index) => (
                <Draggable
                  key={index.toString()}
                  draggableId={index.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <motion.div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="relative mb-4"
                    >
                      <div
                        {...provided.dragHandleProps}
                        className="absolute left-2 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
                      >
                        <GripVertical className="h-5 w-5 text-gray-400" />
                      </div>
                      {renderItem(item, index)}
                    </motion.div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </AnimatePresence>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}