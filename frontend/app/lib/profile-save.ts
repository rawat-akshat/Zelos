import { api } from "../lib/api";
import { formatApiError } from "../lib/api-errors";

/** Upload new avatar if provided; update name when it changed. */
export async function saveProfileChanges(options: {
  name: string;
  avatarFile: File | null;
  currentName: string;
}): Promise<{ name: string; avatarUrl?: string | null }> {
  const result: { name: string; avatarUrl?: string | null } = {
    name: options.name,
  };

  if (options.avatarFile) {
    const user = await api.uploadAvatar(options.avatarFile);
    result.avatarUrl = user.avatar_url ?? null;
    result.name = user.name ?? options.name;
  }

  if (options.name !== options.currentName) {
    const user = await api.updateMe({ name: options.name });
    result.name = user.name ?? options.name;
  }

  return result;
}

export function profileSaveErrorMessage(err: unknown): string {
  return formatApiError(err);
}
