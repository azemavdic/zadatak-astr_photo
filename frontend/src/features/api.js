import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const eventApi = createApi({
  reducerPath: 'eventApi',
  tagTypes: ['Events'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://asko-astron-photo.herokuapp.com/api/',
  }),
  endpoints: (builder) => ({
    sviEventi: builder.query({
      query: () => `events`,
      providesTags: (result) =>
        result
          ? [
              //   ...result.map(({ id }) => ({ type: 'Events', id })),
              { type: 'Events', id: 'LIST' },
            ]
          : [{ type: 'Events', id: 'LIST' }],
    }),
    dodajEvent: builder.mutation({
      query: (body) => ({
        url: 'events',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Events', id: 'LIST' }],
    }),
    izbrisiEvent: builder.mutation({
      query: ({ id }) => ({
        url: `events/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Events', id: 'LIST' }],
    }),
    editEvent: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `events/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: [{ type: 'Events', id: 'LIST' }],
    }),
  }),
})

export const {
  useSviEventiQuery,
  useDodajEventMutation,
  useIzbrisiEventMutation,
  useEditEventMutation,
} = eventApi
