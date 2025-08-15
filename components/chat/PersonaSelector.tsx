import React from "react";
import type { Instructor } from "@/types/chat";
import Image from "next/image";

interface PersonaSelectorProps {
	instructors: Instructor[];
	selectedId: string;
	onSelect: (id: string) => void;
}

export default function PersonaSelector({ instructors, selectedId, onSelect }: PersonaSelectorProps) {
	return (
		<div className="flex items-center gap-4 p-3 bg-zinc-900 border-b border-zinc-800">
			<span className="text-sm text-zinc-400 mr-2">Switch Instructor:</span>
			<div className="flex gap-2">
				{instructors.map(inst => (
					<button
						key={inst.id}
						onClick={() => onSelect(inst.id)}
						className={`flex items-center gap-2 px-3 py-1 rounded-lg border transition-all
							${selectedId === inst.id ? "bg-green-600 border-green-500 text-white" : "bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700"}`}
						style={{ outline: selectedId === inst.id ? "2px solid #22c55e" : undefined }}
					>
						<Image src={inst.image} width={28} height={28} alt={inst.name} className="w-7 h-7 rounded-full border border-zinc-700" />
						<span className="font-medium text-sm">{inst.name}</span>
					</button>
				))}
			</div>
		</div>
	);
}
