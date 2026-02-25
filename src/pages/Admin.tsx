import { useEffect, useState } from 'react';
import type React from 'react';
import { toursService } from '../services/toursService';
import type { Tour } from '../types/tour';

interface FormState {
  id?: string;
  title: string;
  description: string;
  region: string;
  types: string; // comma-separated
  season: string;
  durationDays: string;
  durationNights: string;
  photoUrl: string;
  isCustom: boolean;
}

const emptyForm: FormState = {
  title: '',
  description: '',
  region: '',
  types: '',
  season: '',
  durationDays: '',
  durationNights: '',
  photoUrl: '',
  isCustom: false,
};

const REGIONS = ['Ladakh', 'Spiti', 'Kashmir', 'Himachal'] as const;
const TYPES = ['Cultural', 'Photography', 'Heritage', 'Village', 'Festival'] as const;
const SEASONS = ['Summer', 'Winter', 'Monsoon', 'Festival'] as const;

const AdminPage = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const loadTours = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await toursService.getTours({ page: 1, limit: 50 });
      setTours(data.tours);
    } catch (err) {
      console.error(err);
      setError('Failed to load tours');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadTours();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTypesChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const values = Array.from(e.target.selectedOptions).map((o) => o.value);
    setForm((prev) => ({
      ...prev,
      types: values.join(', '),
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
  };

  const handleEdit = (tour: Tour) => {
    setForm({
      id: tour.id,
      title: tour.title,
      description: tour.description || '',
      region: tour.region,
      types: tour.types.join(', '),
      season: tour.season,
      durationDays: String(tour.durationDays),
      durationNights: String(tour.durationNights),
      photoUrl: tour.photoUrl,
      isCustom: tour.isCustom,
    });
  };

  const handleDelete = async (tour: Tour) => {
    if (!window.confirm(`Delete tour "${tour.title}"?`)) return;

    try {
      setSubmitting(true);
      setError(null);
      await toursService.deleteTour(tour.id);
      await loadTours();
      if (form.id === tour.id) {
        resetForm();
      }
    } catch (err) {
      console.error(err);
      setError('Failed to delete tour');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const typesArray = form.types
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      title: form.title,
      description: form.description || undefined,
      region: form.region,
      types: typesArray,
      season: form.season,
      durationDays: Number(form.durationDays),
      durationNights: Number(form.durationNights),
      photoUrl: form.photoUrl,
      isCustom: form.isCustom,
    };

    try {
      if (form.id) {
        await toursService.updateTour(form.id, payload);
      } else {
        await toursService.createTour(payload);
      }

      await loadTours();
      resetForm();
    } catch (err) {
      console.error(err);
      setError('Failed to save tour (check admin key / data)');
    } finally {
      setSubmitting(false);
    }
  };

  const isEditing = Boolean(form.id);

  const selectedTypes = form.types
    ? form.types
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="flex-grow pt-[72px] min-h-screen bg-[#F7F6F2]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold mb-4 text-[#2B1E17]">Tours Admin</h1>
        <p className="text-sm text-gray-600 mb-6">
          Manage tour packages using the Tours API. Ensure VITE_ADMIN_KEY is set in your environment for admin actions.
        </p>

        {error && (
          <div className="mb-4 rounded border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Tours list */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 max-h-[70vh] overflow-auto">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-medium text-[#2B1E17]">Existing Tours</h2>
              <button
                type="button"
                onClick={loadTours}
                className="text-sm px-3 py-1.5 rounded border border-gray-300 hover:bg-gray-50"
                disabled={loading}
              >
                {loading ? 'Refreshing…' : 'Refresh'}
              </button>
            </div>

            {loading && tours.length === 0 ? (
              <p className="text-sm text-gray-500">Loading tours…</p>
            ) : tours.length === 0 ? (
              <p className="text-sm text-gray-500">No tours found.</p>
            ) : (
              <ul className="space-y-3 text-sm">
                {tours.map((tour) => (
                  <li
                    key={tour.id}
                    className="border border-gray-200 rounded-md p-3 flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {tour.photoUrl && (
                          <img
                            src={tour.photoUrl}
                            alt={tour.title}
                            className="w-16 h-16 rounded object-cover flex-shrink-0 border border-gray-200 bg-gray-100"
                          />
                        )}
                        <div className="min-w-0">
                          <div className="font-semibold text-[#2B1E17] truncate">
                            {tour.title}
                          </div>
                          <div className="text-xs text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">
                            {tour.region} · {tour.season} · {tour.durationDays}D/{tour.durationNights}N
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => handleEdit(tour)}
                          className="px-2 py-1 text-xs rounded border border-gray-300 hover:bg-gray-50"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(tour)}
                          className="px-2 py-1 text-xs rounded border border-red-300 text-red-700 hover:bg-red-50"
                          disabled={submitting}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    {tour.description && (
                      <p className="text-xs text-gray-600 line-clamp-2">{tour.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-medium text-[#2B1E17]">
                {isEditing ? 'Edit Tour' : 'Create New Tour'}
              </h2>
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs text-gray-600 hover:underline"
                >
                  Cancel edit
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Title *</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleInputChange}
                  className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm min-h-[60px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Region *</label>
                  <select
                    name="region"
                    value={form.region}
                    onChange={handleInputChange}
                    className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm bg-white"
                    required
                  >
                    <option value="">Select region</option>
                    {REGIONS.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Season *</label>
                  <select
                    name="season"
                    value={form.season}
                    onChange={handleInputChange}
                    className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm bg-white"
                    required
                  >
                    <option value="">Select season</option>
                    {SEASONS.map((season) => (
                      <option key={season} value={season}>
                        {season}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Types * (hold Ctrl / Cmd for multiple)
                </label>
                <select
                  name="types"
                  multiple
                  value={selectedTypes}
                  onChange={handleTypesChange}
                  className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm bg-white min-h-[80px]"
                  required
                >
                  {TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Duration Days *
                  </label>
                  <input
                    name="durationDays"
                    type="number"
                    min={1}
                    value={form.durationDays}
                    onChange={handleInputChange}
                    className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Duration Nights *
                  </label>
                  <input
                    name="durationNights"
                    type="number"
                    min={0}
                    value={form.durationNights}
                    onChange={handleInputChange}
                    className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Photo URL *</label>
                <input
                  name="photoUrl"
                  value={form.photoUrl}
                  onChange={handleInputChange}
                  className="w-full rounded border border-gray-300 px-2 py-1.5 text-sm"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  id="isCustom"
                  name="isCustom"
                  type="checkbox"
                  checked={form.isCustom}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor="isCustom" className="text-xs text-gray-700">
                  Custom tour
                </label>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded bg-[#2B1E17] text-white text-sm font-medium hover:bg-[#1a0f0a] disabled:opacity-60"
                >
                  {submitting
                    ? isEditing
                      ? 'Saving…'
                      : 'Creating…'
                    : isEditing
                    ? 'Save Changes'
                    : 'Create Tour'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={submitting}
                  className="px-3 py-2 rounded border border-gray-300 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
