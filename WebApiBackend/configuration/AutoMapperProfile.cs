using AutoMapper;
using System;
using System.Collections.Generic;
using WebApiBackend.Models.Entities;
using WebApiBackend.DTO.RoadMap;
using WebApiBackend.DTO.User;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<UserDtoReg, User>();
        CreateMap<UserDtoLog, User>();
        CreateMap<UserDtoGet, User>();
        CreateMap<UserDtoPut, User>();
        CreateMap<RoadMapDtoGet, RoadMap>();
        CreateMap<RoadMap, RoadMapDtoGet>();
        CreateMap<RoadMapDtoPost, RoadMap>();
        CreateMap<RoadMapDtoPut, RoadMap>();
        CreateMap<RoadMapDtoUGet, RoadMap>();
    }
}