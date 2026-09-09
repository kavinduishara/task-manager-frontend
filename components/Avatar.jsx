function Avatar({ user, size = 6 }) {
  const profileImage = user?.profilePicture || user?.profile;
  const nameParts = user?.name ? user.name.trim().split(/\s+/) : [];

  const firstInitial = nameParts[0]?.charAt(0)?.toUpperCase() || "";
  const secondInitial = nameParts[1]?.charAt(0)?.toUpperCase() || "";
  const initials = `${firstInitial}${secondInitial}`;

  const dimensionPx = size * 4;

  return (
    <div className="flex items-center gap-2">
      {profileImage ? (
        <img
          src={profileImage}
          alt={user?.name ? `${user.name}'s avatar` : "User avatar"}
          style={{
            width: `${dimensionPx}px`,
            height: `${dimensionPx}px`,
          }}
          className="rounded-full object-cover ring-2 ring-white shadow-sm"
        />
      ) : initials ? (
        <div
          style={{
            width: `${dimensionPx}px`,
            height: `${dimensionPx}px`,
          }}
          className={`
            flex items-center justify-center
            rounded-full
            bg-indigo-100
            text-indigo-700
            font-semibold
            select-none
            ring-2 ring-white
            shadow-sm
            ${nameParts.length === 1 ? "text-sm" : "text-xs"}
          `}
        >
          {initials}
        </div>
      ) : (
        <div
          style={{
            width: `${dimensionPx}px`,
            height: `${dimensionPx}px`,
          }}
          className="
            flex items-center justify-center
            rounded-full
            bg-slate-100
            text-slate-400
            text-xs
            font-medium
            ring-2 ring-white
          "
        >
          ?
        </div>
      )}
    </div>
  );
}

export default Avatar;