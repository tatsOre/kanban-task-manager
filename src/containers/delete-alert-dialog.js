import { useRef } from 'react'

import {
  AlertDialog,
  AlertDialogLabel,
  AlertDialogDescription
} from '@reach/alert-dialog'

import { DangerButton, SecondaryButton } from '../components/button/index'

const DeleteAlertDialog = ({ board, task, onClose, onDelete, theme }) => {
  const cancelRef = useRef()

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      className="alert-dialog"
      data-theme={theme}>
      {board || task ? (
        <>
          <AlertDialogLabel className="heading-l">
            Delete this {board ? 'board' : 'task'}?
          </AlertDialogLabel>
          <AlertDialogDescription className="body-l">
            Are you sure you want to delete the{' '}
            {board
              ? `'${board.name}' board`
              : `'${task.title}' task and its subtasks`}
            ? This action {board ? 'will remove all columns and tasks' : ''} and
            cannot be reversed.
          </AlertDialogDescription>

          <div className="alert-buttons">
            <DangerButton onClick={onDelete}>Delete</DangerButton>
            <SecondaryButton ref={cancelRef} onClick={onClose}>
              Cancel
            </SecondaryButton>
          </div>
        </>
      ) : (
        <>
          <AlertDialogDescription>
            Something went wrong, try later.
          </AlertDialogDescription>
          <SecondaryButton onClick={onClose}>Close</SecondaryButton>
        </>
      )}
    </AlertDialog>
  )
}

export default DeleteAlertDialog
