type SettingsDialogProps = {
  isOpen: boolean;
};

export function SettingsDialog({ isOpen }: SettingsDialogProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <dialog className="settings-dialog" open>
      <h2>Settings</h2>
    </dialog>
  );
}
