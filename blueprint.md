# To-Do Application Blueprint

## Overview

A simple yet modern to-do list application built with the latest Angular features.

## Phase 1: Basic To-Do List

*   **`ToDo` Interface:** Defines the structure of a to-do item (`id`, `text`, `completed`).
*   **`TodoService`:** Manages the state of to-do items using signals.
    *   `todos`: A signal containing the array of to-do items.
    *   `addTodo(text: string)`: Adds a new to-do.
    *   `deleteTodo(id: number)`: Deletes a to-do.
    *   `toggleTodo(id: number)`: Toggles the completion status of a to-do.
*   **`ToDoListComponent`:**
    *   Displays a list of to-do items.
    *   Includes a form to add new to-dos.
*   **`ToDoItemComponent`:**
    *   Represents a single to-do item.
    *   Has controls to delete or toggle the to-do.
*   **`app.component`:**
    *   Integrates the `ToDoListComponent`.
*   **Styling:**
    *   Basic CSS for a clean and user-friendly interface.
