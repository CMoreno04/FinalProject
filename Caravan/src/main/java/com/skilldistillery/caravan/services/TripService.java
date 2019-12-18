package com.skilldistillery.caravan.services;

import java.util.List;

import com.skilldistillery.caravan.entities.Trip;

public interface TripService {
	public Trip create(Trip trip);

	public Trip update(Trip trip, int id);

	public List<Trip> index();

	public Trip show(int id);


	boolean destroy(int id);
}