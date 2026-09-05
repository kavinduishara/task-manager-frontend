import React from 'react'

function Avatar({ user }) {
    const splitedName=user?.name?.split(' ')
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
                        <div className={`w-6 h-6 rounded-full font-medium ${splitedName.length===1?"text-lg":"text-md"} bg-blue-900 flex items-center justify-center text-white`}>
                            {splitedName[0].charAt(0).toUpperCase() + (splitedName[1]?.charAt(0).toUpperCase() || '')}
                        </div>
                    )}
    </div>
    </>
  )
}

export default Avatar