function Avatar({ user, size = 6 }) {
  const profileImage = user?.profilePicture || user?.profile;
  const nameParts = user?.name ? user.name.trim().split(/\s+/) : [];

  const firstInitial = nameParts[0]?.charAt(0)?.toUpperCase() || '';
  const secondInitial = nameParts[1]?.charAt(0)?.toUpperCase() || '';
  const initials = `${firstInitial}${secondInitial}`;

  // Use explicit pixel sizes or Tailwind arbitrary values to ensure styles apply
  const dimensionPx = size * 4; // Standard Tailwind scale (e.g., size 6 = 24px)

  return (
    <div className="flex items-center gap-2">
      {profileImage ? (
        <img
          src={profileImage}
          alt={user?.name ? `${user.name}'s avatar` : 'User avatar'}
          style={{ width: `${dimensionPx}px`, height: `${dimensionPx}px` }}
          className="rounded-full object-cover"
        />
      ) : initials ? (
        <div
          style={{ width: `${dimensionPx}px`, height: `${dimensionPx}px` }}
          className={`rounded-full font-medium ${
            nameParts.length === 1 ? 'text-lg' : 'text-base'
          } bg-blue-900 flex items-center justify-center text-white select-none`}
        >
          {initials}
        </div>
      ) : (
        <div
          style={{ width: `${dimensionPx}px`, height: `${dimensionPx}px` }}
          className="rounded-full bg-gray-400 flex items-center justify-center text-white text-xs"
        >
          ?
        </div>
      )}
    </div>
  );
}

export default Avatar;