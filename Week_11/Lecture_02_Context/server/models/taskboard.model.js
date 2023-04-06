import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const TaskBoardSchema = new Schema({
  owner: {
    type: ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  columns: [
    {
      title: {
        type: String,
        required: true,
      },
      tasks: [
        {
          title: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: false,
          },
          isComplete: {
            type: Boolean,
            default: false,
          },
          subTasks: [
            {
              text: {
                type: String,
              },
              isComplete: {
                type: Boolean,
                default: false,
              },
            },
          ],
          created_at: {
            type: Date,
            default: new Date(),
          },
        },
      ],
    },
  ],
});

const TaskBoard = model("TaskBoard", TaskBoardSchema);
export default TaskBoard;
