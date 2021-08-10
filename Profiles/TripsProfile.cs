using AutoMapper;

public class TripsProfile : Profile {

    public TripsProfile()
    {
        // TripCreateDto -> Trip
        CreateMap<TripCreateDto, Trip>();

        // Trip -> TripReadDto
        CreateMap<Trip, TripReadDto>();

        // TripUpdateDto -> Trip
        CreateMap<TripUpdateDto, Trip>()
            .ReverseMap();

    }
}