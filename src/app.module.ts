import { Module } from '@nestjs/common';
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
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, ProfileType, ClassLevel, Course, Grade, StudentResult],
      synchronize: true,
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