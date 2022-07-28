using AutoMapper;

public class OrdersProfile : Profile {
    public OrdersProfile() {

        // Order -> OrderReadDto
        CreateMap<Order, OrderReadDto>();

        // OrderCreateDto -> Order
        CreateMap<OrderCreateDto, Order>();
    }
}