import React from 'react';
import { View, Image } from 'react-native';

interface AvatarStackProps {
  members: Array<{ id: string; name: string; avatar?: string; isActive?: boolean }>;
  maxDisplay?: number;
  size?: number;
}

export function AvatarStack({ members, maxDisplay = 4, size = 40 }: AvatarStackProps) {
  const displayMembers = members.slice(0, maxDisplay);
  const remainingCount = members.length - maxDisplay;

  return (
    <View className="flex-row">
      {displayMembers.map((member, index) => (
        <View
          key={member.id}
          style={{
            width: size,
            height: size,
            marginLeft: index > 0 ? -size / 3 : 0,
            zIndex: displayMembers.length - index,
          }}
          className="rounded-full border-2 border-white bg-gray-200 items-center justify-center overflow-hidden shadow-sm"
        >
          {member.avatar ? (
            <Image source={{ uri: member.avatar }} style={{ width: size, height: size }} />
          ) : (
            <Text className="text-secondary font-bold" style={{ fontSize: size / 2.5 }}>
              {member.name[0]}
            </Text>
          )}
          {member.isActive && (
            <View className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-white" />
          )}
        </View>
      ))}
      {remainingCount > 0 && (
        <View
          style={{
            width: size,
            height: size,
            marginLeft: -size / 3,
          }}
          className="rounded-full border-2 border-white bg-primary/10 items-center justify-center"
        >
          <Text className="text-primary font-bold" style={{ fontSize: size / 2.5 }}>
            +{remainingCount}
          </Text>
        </View>
      )}
    </View>
  );
}
