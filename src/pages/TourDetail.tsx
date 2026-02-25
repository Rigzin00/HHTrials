import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toursService } from '../services/toursService';
import type { Tour } from '../types/tour';

const TourDetail = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const [tour, setTour] = useState<Tour | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!id) return;

		const load = async () => {
			try {
				setLoading(true);
				setError(null);
				const data = await toursService.getTour(id);
				setTour(data);
			} catch (err) {
				console.error(err);
				setError('Failed to load tour');
			} finally {
				setLoading(false);
			}
		};

		void load();
	}, [id]);

	if (!id) {
		return (
			<div className="flex-grow pt-[72px] min-h-screen bg-[#F7F6F2]">
				<div className="max-w-4xl mx-auto px-4 py-8">
					<p className="text-sm text-gray-600">Invalid tour ID.</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex-grow pt-[72px] min-h-screen bg-[#F7F6F2]">
			<div className="max-w-4xl mx-auto px-4 py-8">
				<button
					onClick={() => navigate(-1)}
					className="mb-4 text-sm text-gray-600 hover:underline"
				>
					← Back
				</button>

				{loading && !tour && (
					<p className="text-sm text-gray-500">Loading tour...</p>
				)}

				{error && (
					<p className="text-sm text-red-600 mb-3">{error}</p>
				)}

				{tour && (
					<div className="bg-white rounded-xl shadow-md overflow-hidden">
						<div className="h-72 bg-gray-200 overflow-hidden">
							<img
								src={tour.photoUrl}
								alt={tour.title}
								className="w-full h-full object-cover"
							/>
						</div>

						<div className="p-6 space-y-4">
							<div className="flex items-center justify-between gap-4">
								<div>
									<h1 className="text-2xl font-semibold text-[#2b140c]">
										{tour.title}
									</h1>
									<p className="text-sm text-gray-500 mt-1">
										{tour.region} · {tour.season} · {tour.durationNights}N / {tour.durationDays}D
									</p>
								</div>
								<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-400 text-white">
									{tour.isCustom ? 'Custom Tour' : 'Recommended'}
								</span>
							</div>

							{tour.types.length > 0 && (
								<div className="flex flex-wrap gap-2">
									{tour.types.map((type) => (
										<span
											key={type}
											className="bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full"
										>
											{type}
										</span>
									))}
								</div>
							)}

							{tour.description && (
								<p className="text-sm text-gray-700 leading-relaxed">
									{tour.description}
								</p>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default TourDetail;
