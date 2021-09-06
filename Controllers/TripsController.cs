using System;
using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace travelo_auth.Controllers
{
    [Route("api/trips")]
    [ApiController]
    public class TripsController : ControllerBase
    {

        private ITripRepository _repository;
        private IMapper _mapper;

        public TripsController(ITripRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Trip>> GetAllTrips()
        {
            var tripItems = _repository.GetAllTrips();
            var tripReadDtoItems = _mapper.Map<IEnumerable<TripReadDto>>(tripItems);
            return Ok(tripItems);
        }

        [HttpGet("{id}", Name = "GetTripById")]
        public ActionResult<TripReadDto> GetTripById(Guid id)
        {

            var tripItem = _repository.GetTripById(id);
            var tripReadDtoItem = _mapper.Map<TripReadDto>(tripItem);

            return tripItem is null ? NotFound() : Ok(tripReadDtoItem);
        }

        [Authorize(Policy = "AdminPolicy")]
        [HttpPost]
        public ActionResult<TripReadDto> CreateTrip(TripCreateDto tripCreateDto)
        {

            //ar base64image = tripCreateDto.tripImage.Image;
            //Convert.FromBase64String(base64image);
            //System.Console.WriteLine("SADASDASD");

            var tripItem = _mapper.Map<Trip>(tripCreateDto);
            _repository.CreateTrip(tripItem);
            _repository.SaveChanges();

            var tripReadDto = _mapper.Map<TripReadDto>(tripItem);

            return CreatedAtRoute(
                nameof(GetTripById),
                new
                {
                    id = tripReadDto.Id
                },
                tripReadDto
            );
        }

        [HttpPut("{id}")]
        public ActionResult UpdateTrip(Guid id, TripUpdateDto tripUpdateDto)
        {

            var tripItem = _repository.GetTripById(id);
            if (tripItem is null) return NotFound();

            _mapper.Map(tripUpdateDto, tripItem);

            _repository.UpdateTrip(tripItem);
            _repository.SaveChanges();

            return NoContent();
        }

        [HttpPatch("{id}")]
        public ActionResult PartialTripUpdate(Guid id, JsonPatchDocument<TripUpdateDto> patchdocument)
        {

            // Get the item we want to partially update from the repo
            var tripItem = _repository.GetTripById(id);
            if (tripItem is null) return NotFound();

            // Map the item we want to partially update to match the DTO type we received
            var mappedTripItem = _mapper.Map<TripUpdateDto>(tripItem);

            // Update the DTO mapped item with the newly received information
            patchdocument.ApplyTo(mappedTripItem, ModelState);
            if (!TryValidateModel(mappedTripItem)) return ValidationProblem(ModelState);

            // Reverse map the item from DTO to database form
            _mapper.Map(mappedTripItem, tripItem);
            _repository.UpdateTrip(tripItem);
            _repository.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteTrip(Guid id)
        {

            var tripItem = _repository.GetTripById(id);
            if (tripItem is null) return NotFound();

            _repository.DeleteTrip(tripItem);
            _repository.SaveChanges();

            return NoContent();
        }

        [HttpDelete]
        public ActionResult DeleteAllTrips()
        {

            _repository.DeleteAllTrips();
            _repository.SaveChanges();

            return NoContent();
        }

    }
}

