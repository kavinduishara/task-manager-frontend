import React from 'react'

function Avatar({ user }) {
  return (
    <>
        <div className="flex items-center gap-2">
                        {user?.profilePicture && (
                            <img
                                src={user.profilePicture}
                                className="w-6 h-6 rounded-full"
                        />
                    )}
                    {!user?.profilePicture && user?.name && (
                        <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs text-gray-700">
                            {user.name.split(' ')[0].charAt(0).toUpperCase() + user.name.split(' ')[1]?.charAt(0).toUpperCase()}
                        </div>
                    )}
    </div>
    </>
  )
}

export default Avatar