import React from 'react'
import Section from './Section'

function TaskDescription({description, setDescription}: {description: string; setDescription: (desc: string) => void}) {
  return (
    <Section number={2} title="Description & Specifications">
        <div className="rounded-lg border border-slate-200 overflow-hidden">
            <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe key acceptance criteria, architectural context, or technical notes..."
            rows={5}
            className="w-full px-3 py-2.5 text-sm outline-none resize-none placeholder-slate-400"
            />
        </div>
    </Section>
  )
}

export default TaskDescription