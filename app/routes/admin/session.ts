interface Session {
  isAdmin: boolean;
}

persisted['sessions'] ??= new Map<string, Session>();
export let sessions = persisted['sessions'] as Map<string, Session>;

export function getSession(input: RouteInput) {
  console.log(input.cookies)

  const sessionId = input.cookies?.['wwwiii'] || null;
  const session = sessionId ? sessions!.get(sessionId) ?? null : null;
  return session;
}

// console.log(sessions.get('384a269e-f1e4-4dd2-bd76-7d5562e34184'))
