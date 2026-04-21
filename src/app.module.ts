import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfileTypesModule } from './profile-types/profile-types.module';
import { ClassLevelsModule } from './class-levels/class-levels.module';
import { CoursesModule } from './courses/courses.module';
import { GradesModule } from './grades/grades.module';

// Entités
import { User } from './users/user.entity';
import { ProfileType } from './profile-types/profile-types.entity';
import { ClassLevel } from './class-levels/class-level.entity';
import { Course } from './courses/course.entity';
import { Grade } from './grades/grade.entity';
import { StudentResult } from './grades/student-result.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, ProfileType, ClassLevel, Course, Grade, StudentResult],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    ProfileTypesModule,
    ClassLevelsModule,
    CoursesModule,
    GradesModule,
  ],
})
export class AppModule {}
