export default function formatRelativeTime(date: Date | null) { 
    if (!date) return ''; 
    const elapsedSeconds = Math.round((date.getTime() - Date.now()) / 1000); 
    const units = [ 
        { unit: 'year', seconds: 31536000 }, 
        { unit: 'month', seconds: 2592000 }, 
        { unit: 'day', seconds: 86400 }, 
        { unit: 'hour', seconds: 3600 }, 
        { unit: 'minute', seconds: 60 }, 
        { unit: 'second', seconds: 1 }, 
    ] as const; 
    const relativeUnit = units.find(({ seconds }) => 
        Math.abs(elapsedSeconds) >= seconds) ?? units[units.length - 1]; 
    const value = Math.round(elapsedSeconds / relativeUnit.seconds); 
    return new Intl
    .RelativeTimeFormat('en', { numeric: 'auto' })
    .format(value, relativeUnit.unit); 
}